/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
    app(input) {
        return {
            name: 'barneydev',
            removal: input?.stage === 'production' ? 'retain' : 'remove',
            home: 'aws',
        };
    },
    async run() {
        const infra = await import('./infra');
        return {
            siteBucketName: infra.siteBucket.name,
            uploadedAssetsCount: infra.uploadedAssets.length,
            url: infra.router.url,
        };
    },
});
