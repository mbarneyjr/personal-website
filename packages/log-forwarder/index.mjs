const zlib = require('zlib');
import { Resource } from 'sst';
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const {
  CloudWatchLogsClient,
  CreateLogStreamCommand,
  PutLogEventsCommand,
} = require('@aws-sdk/client-cloudwatch-logs');

const logs = new CloudWatchLogsClient({});
const s3 = new S3Client({});

async function parseLogFile(buffer) {
  const result = await new Promise((resolve, reject) => {
    zlib.gunzip(buffer, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result.toString());
    });
  });
  const logEntries = result
    .split('\n')
    .filter((line) => !line.startsWith('#') && 0 < line.length)
    .map((line) => {
      const logFields = line.split('\t');
      const fieldNames = [
        'date',
        'time',
        'x-edge-location',
        'sc-bytes',
        'c-ip',
        'cs-method',
        'cs(Host)',
        'cs-uri-stem',
        'sc-status',
        'cs(Referer)',
        'cs(User-Agent)',
        'cs-uri-query',
        'cs(Cookie)',
        'x-edge-result-type',
        'x-edge-request-id',
        'x-host-header',
        'cs-protocol',
        'cs-bytes',
        'time-taken',
        'x-forwarded-for',
        'ssl-protocol',
        'ssl-cipher',
        'x-edge-response-result-type',
        'cs-protocol-version',
        'fle-status',
        'fle-encrypted-fields',
        'c-port',
        'time-to-first-byte',
        'x-edge-detailed-result-type',
        'sc-content-type',
        'sc-content-len',
        'sc-range-start',
        'sc-range-end',
      ];
      const logObj = {};
      for (let i = 0; i < fieldNames.length; i++) {
        logObj[fieldNames[i]] = decodeURI(logFields[i]) || null;
      }
      return logObj;
    });
  return logEntries;
}

async function flushBatch(logEntries, logStreamName) {
  const failures = [];
  const sortedLogEntries = logEntries
    .sort((a, b) => (new Date(`${a.date} ${a.time}`).getTime() < new Date(`${b.date} ${b.time}`).getTime() ? -1 : 1))
    .map((logEntry) => ({
      message: JSON.stringify(logEntry),
      timestamp: new Date(`${logEntry.date} ${logEntry.time}`).getTime(),
    }));
  const result = await logs.send(
    new PutLogEventsCommand({
      logGroupName: Resource.SiteLogGroup.siteLogGroupName,
      logStreamName,
      logEvents: sortedLogEntries,
    }),
  );
  if (result.rejectedLogEventsInfo) {
    console.error(
      JSON.stringify({ message: 'Rejected log events', rejectedLogEventsInfo: result.rejectedLogEventsInfo }),
    );
    failures.push(result.rejectedLogEventsInfo);
  }
  return failures;
}

async function forwardLogEntries(logEntries, logStreamName) {
  let failures = [];
  let batch = [];
  let batchByteSize = 0;
  for (const logEntry of logEntries) {
    const logEntryString = JSON.stringify(logEntry);
    const logEntryByteSize = Buffer.byteLength(logEntryString) + 26;
    if (1_048_576 < batchByteSize + logEntryByteSize) {
      failures = failures.concat(await flushBatch(batch, logStreamName));
      batch = [];
      batchByteSize = 0;
    }
    batch.push(logEntry);
    batchByteSize += logEntryByteSize;
  }
  failures = failures.concat(await flushBatch(batch, logStreamName));
  return failures;
}

/**
 * @param {import('aws-lambda').S3NotificationEvent} event
 */
export async function handler(event, context) {
  console.log(JSON.stringify({ event }));
  const key = event.detail.object.key;
  const bucket = event.detail.bucket.name;
  let failures = [];
  if (!key || !bucket) {
    console.error(JSON.stringify({ message: 'Event does not contain s3 object key or bucket name', event }));
    failures.push(event);
  } else {
    await logs
      .send(
        new CreateLogStreamCommand({
          logGroupName: Resource.SiteLogGroup.siteLogGroupName,
          logStreamName: key,
        }),
      )
      .catch((err) => {
        if (err.name !== 'ResourceAlreadyExistsException') throw err;
      });
    const response = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );
    const body = await response.Body.transformToByteArray();
    const logEntries = await parseLogFile(body);
    failures = failures.concat(await forwardLogEntries(logEntries, key));
  }
  if (failures.length === 0) {
    console.log(JSON.stringify({ message: 'Successfully processed event' }));
  } else {
    throw new Error(`Error processing event: ${JSON.stringify({ failures })}`);
  }
}
