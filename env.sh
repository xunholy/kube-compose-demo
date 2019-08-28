# The backend service authenticates with [plivo](https://plivo.com) as a third party that provides SMS services.
# The `AUTH_ID` and `AUTH_TOKEN` environment variables are required to authenticate with plivo.
# Please update these credentials with your own.
export AUTH_ID=asdf
export AUTH_TOKEN=asdf

# These environment variables are used by kube-compose, so we do not have to set the --env-id and --log-level flags
# repeatedly.
export KUBECOMPOSE_LOGLEVEL=debug
export KUBECOMPOSE_ENVID=build1
