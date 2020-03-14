#!/bin/bash
export REGISTRY_HOST=localhost
export PROJECT_PATHNAME=${PWD##*/}
export BRANCH=prod
export REVISION=latest
export COMPOSE_PROJECT_NAME=$PROJECT_PATHNAME
export VIRTUAL_HOST=sixsocks.tk
docker-compose -f build.yml -f prod.yml $@