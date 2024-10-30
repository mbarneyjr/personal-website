#!/bin/bash

set -euo pipefail

# get to project root
cd ../..

export APPLICATION_NAME=barneydev
export STACK_NAME=${APPLICATION_NAME}-${ENVIRONMENT_NAME}
export CHANGE_SET_NAME=${CHANGE_SET_NAME:-$(whoami)$(date -u +"%Y%md%H%M%S")}
export CHANGE_SET_DESCRIPTION=${CHANGE_SET_DESCRIPTION:-$(whoami)$(date -u +"%Y%md%H%M%S")}

if [[ "${ENVIRONMENT_NAME}" == "prod" ]]; then
  export HOSTED_ZONE_NAME=barney.dev
  export DOMAIN_NAME=barney.dev
elif [[ "${ENVIRONMENT_NAME}" == "qa" ]]; then
  export HOSTED_ZONE_NAME=qa.barney.dev
  export DOMAIN_NAME=qa.barney.dev
elif [[ "${ENVIRONMENT_NAME}" == "dev" ]]; then
  export HOSTED_ZONE_NAME=dev.barney.dev
  export DOMAIN_NAME=dev.barney.dev
else
  export HOSTED_ZONE_NAME=dev.barney.dev
  export DOMAIN_NAME=${ENVIRONMENT_NAME}.dev.barney.dev
fi

pushd infra/barneydev

echo "Deploying ${STACK_NAME} with changeset ${CHANGE_SET_NAME}"

aws cloudformation create-change-set \
  --stack-name ${STACK_NAME} \
  --template-body file://template.yml \
  --parameters \
      ParameterKey=ApplicationName,ParameterValue="${APPLICATION_NAME}" \
      ParameterKey=EnvironmentName,ParameterValue="${ENVIRONMENT_NAME}" \
      ParameterKey=HostedZoneName,ParameterValue="${HOSTED_ZONE_NAME}" \
      ParameterKey=DomainName,ParameterValue="${DOMAIN_NAME}" \
  --tags \
      Key=ApplicationName,Value=${APPLICATION_NAME} \
      Key=EnvironmentName,Value=${ENVIRONMENT_NAME} \
      Key=workload,Value=${APPLICATION_NAME}-${ENVIRONMENT_NAME} \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM CAPABILITY_IAM \
  --change-set-name ${CHANGE_SET_NAME} \
  --description "${CHANGE_SET_DESCRIPTION}" \
  --include-nested-stacks \
  --change-set-type $(aws cloudformation describe-stacks --stack-name ${STACK_NAME} &> /dev/null && echo "UPDATE" || echo "CREATE")

echo "Waiting for change set to be created..."

export CHANGE_SET_STATUS=None
export CHANGE_SET_STATUS_REASON=None
while [[ "${CHANGE_SET_STATUS}" != "CREATE_COMPLETE" && "${CHANGE_SET_STATUS}" != "FAILED" ]]; do
  export CHANGE_SET=$(aws cloudformation describe-change-set --stack-name ${STACK_NAME} --change-set-name ${CHANGE_SET_NAME});
  export CHANGE_SET_STATUS=$(echo ${CHANGE_SET} | jq .Status -r);
  export CHANGE_SET_STATUS_REASON=$(echo ${CHANGE_SET} | jq .StatusReason -r);
done
npx cfn-changeset-viewer --stack-name ${STACK_NAME} --change-set-name ${CHANGE_SET_NAME}
if [[ "$CHANGE_SET_STATUS_REASON" != "The submitted information didn't contain changes. Submit different information to create a change set." ]];
then
  aws cloudformation execute-change-set \
    --stack-name ${STACK_NAME} \
    --change-set-name ${CHANGE_SET_NAME}
  npx cfn-event-tailer ${STACK_NAME}
fi;

popd

pushd packages/barneydev

aws rum get-app-monitor \
  --region ${AWS_REGION} \
  --name ${APPLICATION_NAME}-${ENVIRONMENT_NAME}-rum > site/rum.json

aws s3 sync site s3://${STACK_NAME} --delete

popd
