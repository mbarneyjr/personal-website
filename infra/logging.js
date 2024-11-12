export const siteLogBucket = new sst.aws.Bucket('SiteLogsBucket', {
    versioning: true,
    transform: {
        bucket: {
            bucket: `${$app.name}-${$app.stage}-site-logs`,
        },
    },
});
new aws.s3.BucketNotification('SiteLogsBucketNotifications', {
    bucket: siteLogBucket.name,
    eventbridge: true,
});
new aws.s3.BucketOwnershipControls('SiteLogsBucketOwnershipControls', {
    bucket: siteLogBucket.name,
    rule: {
        objectOwnership: 'BucketOwnerPreferred',
    },
});
const siteLogGroup = new aws.cloudwatch.LogGroup('SiteLogGroup', {
    name: `/${$app.name}/${$app.stage}/site`,
});
const siteLogGroupLinkable = new sst.Linkable('SiteLogGroup', {
    include: [
        sst.aws.permission({
            actions: ['logs:CreateLogStream', 'logs:PutLogEvents'],
            resources: [$interpolate `${siteLogGroup.arn}:*`, $interpolate `${siteLogGroup.arn}:log-stream:*`],
        }),
    ],
    properties: {
        siteLogGroupName: siteLogGroup.name,
    },
});
const siteLogForwarder = new sst.aws.Function('SiteLogForwarder', {
    name: `${$app.name}-${$app.stage}-site-log-forwarder`,
    dev: false,
    nodejs: {
        sourcemap: true,
    },
    handler: './packages/log-forwarder/index.handler',
    link: [siteLogGroupLinkable, siteLogBucket],
    environment: {
        NODE_OPTIONS: '--enable-source-maps',
    },
});
const uploadTriggerRule = new aws.cloudwatch.EventRule('SiteLogForwarderUploadTrigger', {
    name: `${$app.name}-${$app.stage}-site-log-forwarder`,
    eventPattern: siteLogBucket.name.apply((v) => JSON.stringify({
        source: ['aws.s3'],
        ['detail-type']: ['Object Created'],
        detail: {
            bucket: {
                name: [v],
            },
        },
    })),
});
new aws.cloudwatch.EventTarget('SiteLogForwarderUploadTriggerTarget', {
    rule: uploadTriggerRule.name,
    arn: siteLogForwarder.arn,
    targetId: siteLogForwarder.name,
});
new aws.lambda.Permission('SiteLogForwarderUploadTriggerPermission', {
    action: 'lambda:InvokeFunction',
    function: siteLogForwarder.name,
    principal: 'events.amazonaws.com',
    sourceArn: uploadTriggerRule.arn,
});
