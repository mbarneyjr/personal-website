#!/usr/bin/env bash

set -euo pipefail

usage() {
  echo "usage: load-config.sh <environment-name>"
  exit 1
}

ENVIRONMENT_NAME=${1:-}
if [[ -z "${ENVIRONMENT_NAME}" ]]; then
  usage
fi

# load environment
set -a
# shellcheck disable=SC1091
[[ -f infra/.env ]] && source infra/.env
# shellcheck disable=SC1090
[[ -f infra/.env.${ENVIRONMENT_NAME} ]] && source "infra/.env.${ENVIRONMENT_NAME}"
set +a
