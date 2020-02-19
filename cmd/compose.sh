#!/bin/bash
export REGISTRY_HOST=localhost
export PROJECT_PATHNAME=${PWD##*/}
export BRANCH=development
export REVISION=latest
export COMPOSE_PROJECT_NAME=$PROJECT_PATHNAME
export VIRTUAL_HOST=${COMPOSE_PROJECT_NAME}.test
docker-compose -f build.yml -f dev.yml $@