#!/usr/bin/env bash
set -xeuo pipefail
GREETING=$(curl --fail --silent http://backend:8081/)
if [[ $GREETING != 'Hello Kubernetes User Group! You were here on 29 August 2019!' ]]; then
    1>&2 echo "test failed!"
    
    # Sleep so kube-compose's log stream gets a chance to pick up on the above echo (kube-compose is a bit too eager when closing watch).
    sleep 3
    exit 1
fi
echo "test succeeded"
# Sleep so kube-compose's log stream gets a chance to pick up on the above echo (kube-compose is a bit too eager when closing watch).
sleep 3
