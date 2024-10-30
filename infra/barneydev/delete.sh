#!/bin/bash

set -euo pipefail

# get to project root
cd ../..

export APPLICATION_NAME=barneydev
export STACK_NAME=${APPLICATION_NAME}-${ENVIRONMENT_NAME}

./scripts/empty-s3-bucket.sh --bucket ${STACK_NAME}
./scripts/empty-s3-bucket.sh --bucket ${STACK_NAME}-cloudfront-logs
aws cloudformation delete-stack --stack-name ${STACK_NAME}
