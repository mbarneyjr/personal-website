import { join } from 'node:path';
import { Resource } from 'sst';

/** @type {import('aws-lambda').LambdaFunctionURLHandler} */
export async function handler(event, _context) {
  console.log(JSON.stringify({ event }));
  const result = {
    statusCode: 302,
    headers: {
      location: `https://${join(Resource.SiteRedirect.domainName, event.rawPath)}`,
    },
  };
  console.log(JSON.stringify({ result }));
  return result;
}
