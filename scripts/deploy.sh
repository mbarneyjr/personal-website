#!/usr/bin/env bash

set -euo pipefail

ENVIRONMENT_NAME=${1:-$(whoami)}

source ./scripts/utils/load-config.sh "${ENVIRONMENT_NAME}"

./scripts/utils/plan.sh "${ENVIRONMENT_NAME}" site
./scripts/utils/apply.sh "${ENVIRONMENT_NAME}" site

pushd ./packages/barneydev/site
SITE_BUCKET_NAME=$(aws cloudformation describe-stacks \
  --stack-name "${APPLICATION_NAME}-${ENVIRONMENT_NAME}-site" \
  --query "Stacks[0].Outputs[?OutputKey=='SiteBucketName'].OutputValue" \
  --output text)
aws s3 sync --delete ./ "s3://${SITE_BUCKET_NAME}/"
popd
