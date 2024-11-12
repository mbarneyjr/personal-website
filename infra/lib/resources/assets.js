import { lstatSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import mime from 'mime';
export function Assets(bucket, siteDir, prefix) {
    let uploadedAssets = [];
    for (let item of readdirSync(siteDir)) {
        let filePath = join(siteDir, item);
        if (lstatSync(filePath).isDirectory()) {
            const newPrefix = prefix ? join(prefix, item) : item;
            uploadedAssets = uploadedAssets.concat(Assets(bucket, filePath, newPrefix));
            continue;
        }
        let itemPath = prefix ? join(prefix, item) : item;
        uploadedAssets.push(new aws.s3.BucketObjectv2(itemPath, {
            bucket: bucket,
            contentBase64: readFileSync(filePath).toString('base64'),
            contentType: mime.getType(filePath) || undefined,
        }));
    }
    return uploadedAssets;
}
