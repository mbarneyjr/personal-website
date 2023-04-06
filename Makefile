MAKEFLAGS=--warn-undefined-variables

export APPLICATION_NAME=mbarneyme
export ENVIRONMENT_NAME
export STACK_NAME ?= ${APPLICATION_NAME}-$(ENVIRONMENT_NAME)
export AWS_REGION ?= us-east-2
export CHANGE_SET_NAME
export CHANGE_SET_DESCRIPTION
export DOMAIN_NAME
export HOSTED_ZONE_NAME

node_modules: package-lock.json
	npm ci
	touch node_modules

.PHONY: lint create-change-set deploy-change-set delete upload clean
dependencies: node_modules
	pip install -r requirements.txt

lint:
	cfn-lint

create-change-set: node_modules
	./scripts/create-change-set.sh

deploy-change-set: node_modules
	./scripts/deploy-change-set.sh

delete:
	./scripts/empty-s3-bucket.sh --bucket ${APPLICATION_NAME}-${ENVIRONMENT_NAME}
	aws cloudformation delete-stack --stack-name ${STACK_NAME}

.PHONY: site/rum.json
site/rum.json:
	aws rum get-app-monitor --region ${AWS_REGION} --name ${APPLICATION_NAME}-${ENVIRONMENT_NAME}-rum > site/rum.json

upload: site/rum.json
	aws s3 sync site s3://${STACK_NAME} --delete
