#!/usr/bin/env bash

set -euo pipefail

ENVIRONMENT_NAME=${1:-$(whoami)}

source ./scripts/utils/load-config.sh "${ENVIRONMENT_NAME}"

SITE_BUCKET_NAME=$(aws cloudformation describe-stacks \
  --stack-name "${APPLICATION_NAME}-${ENVIRONMENT_NAME}-site" \
  --query "Stacks[0].Outputs[?OutputKey=='SiteBucketName'].OutputValue" \
  --output text)
echo "SITE_BUCKET_NAME=${SITE_BUCKET_NAME}"

empty_bucket() {
  local bucket=$1
  local objects
  aws s3api head-bucket --bucket "${bucket}" >/dev/null 2>&1 || return 0
  echo "Emptying S3 bucket: ${bucket}"
  while true; do
    objects=$(aws s3api list-object-versions --bucket "${bucket}" --max-items 1000 --output json |
      jq -c '{Objects: [(.Versions // [])[], (.DeleteMarkers // [])[] | {Key, VersionId}], Quiet: true}')
    [[ "$(echo "${objects}" | jq '.Objects | length')" -eq 0 ]] && break
    aws s3api delete-objects --no-cli-pager --bucket "${bucket}" --delete "${objects}" >/dev/null
  done
}

empty_bucket "${SITE_BUCKET_NAME}"

./scripts/utils/delete.sh "${ENVIRONMENT_NAME}" site
