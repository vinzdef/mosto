#!/bin/bash
source .env
export REGISTRY_HOST=registry.ghzmdr.tk
export PROJECT_PATHNAME=testpath
export BRANCH_NAME=testref
export VIRTUAL_HOST=testproject.ghzmdr.tk
docker-compose -f build.yml -f prod.yml $@