#!/usr/bin/env bash
set -euo pipefail

readonly CONTAINING_DIR=$(unset CDPATH && cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
cd "$CONTAINING_DIR"/backend
docker build --tag backend:latest .

cd "$CONTAINING_DIR"/frontend
docker build --tag frontend:latest .

cd "$CONTAINING_DIR"/test_runner
docker build --tag test_runner:latest .
