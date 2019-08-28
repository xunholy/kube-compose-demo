#!/usr/bin/env bash
set -xeuo pipefail
GREETING=$(curl --fail --silent http://backend:8081/)
if [[ $GREETING != 'Hello Kubernetes User Group! You were here on 29 August 2019!' ]]; then
    1>&2 echo "test failed!"
    sleep 10
    exit 1
fi
echo "test succeeded"
sleep 10
