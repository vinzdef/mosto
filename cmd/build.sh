#!/bin/bash
source .env
export REGISTRY_HOST=registry.ghzmdr.tk
export PROJECT_PATHNAME=testpath
export GIT_REF=testref
export VIRTUAL_HOST=testproject.ghzmdr.tk
docker-compose -f build.yml $@