import { config } from './lib/config';
import { siteBucket } from './assets';

const identity = await aws.getCallerIdentity();
const region = await aws.getRegion();

const identityPool = new aws.cognito.IdentityPool('RumIdentityPool', {
  identityPoolName: `${$app.name}-${$app.stage}-rum`,
  allowUnauthenticatedIdentities: true,
  allowClassicFlow: true,
});
const clientRole = new aws.iam.Role('RumClientRole', {
  name: `${$app.name}-${$app.stage}-rum-client`,
  assumeRolePolicy: {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: {
          Federated: 'cognito-identity.amazonaws.com',
        },
        Action: 'sts:AssumeRoleWithWebIdentity',
        Condition: {
          StringEquals: {
            'cognito-identity.amazonaws.com:aud': identityPool.id,
          },
          'ForAnyValue:StringLike': {
            'cognito-identity.amazonaws.com:amr': 'unauthenticated',
          },
        },
      },
    ],
  },
});
new aws.iam.RolePolicy('RumClientRolePolicy', {
  role: clientRole,
  name: `${$app.name}-${$app.stage}-rum-client-policy`,
  policy: {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Action: 'rum:PutRumEvents',
        Resource: `arn:aws:rum:${region.id}:${identity.accountId}:appmonitor/${$app.name}-${$app.stage}-rum`,
      },
    ],
  },
});
new aws.cognito.IdentityPoolRoleAttachment('RumIdentityPoolRoleAttachment', {
  identityPoolId: identityPool.id,
  roles: {
    unauthenticated: clientRole.arn,
  },
});

const rumLogGroup = new aws.cloudwatch.LogGroup('RumLogGroup', {
  name: `/${$app.name}/${$app.stage}/rum`,
});

const appMonitor = new aws.rum.AppMonitor('Rum', {
  name: `${$app.name}-${$app.stage}-rum`,
  domain: config.domainName,
  cwLogEnabled: true,
  appMonitorConfiguration: {
    identityPoolId: identityPool.id,
    guestRoleArn: clientRole.arn,
    sessionSampleRate: 1.0,
    allowCookies: true,
    enableXray: true,
    telemetries: ['errors', 'performance', 'http'],
    favoritePages: ['/', '/resume'],
  },
});

const rumConfig = $util
  .all([appMonitor.appMonitorId, identityPool.id, clientRole.arn])
  .apply(([appMonitor, identityPool, clientRole]) =>
    JSON.stringify(
      {
        Id: appMonitor,
        SessionSampleRate: 1.0,
        GuestRoleArn: clientRole,
        IdentityPoolId: identityPool,
        Telemetries: ['errors', 'performance', 'http'],
        AllowCookies: true,
        EnableXRay: true,
      },
      null,
      2,
    ),
  );
const rumFile = new aws.s3.BucketObjectv2('RumFile', {
  bucket: siteBucket.name,
  key: 'rum.json',
  content: rumConfig,
  contentType: 'application/json',
});
const cwrLib = new aws.s3.BucketObjectv2('CwrFile', {
  bucket: siteBucket.name,
  key: '/scripts/cwr.js',
  source: new $util.asset.RemoteAsset('https://client.rum.us-east-1.amazonaws.com/1.19.0/cwr.js'),
  contentType: 'application/json',
});

export { appMonitor };
