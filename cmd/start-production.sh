#!/bin/bash
source .env

export REGISTRY_HOST=localhost
export PROJECT_PATHNAME=${PWD##*/}
export BRANCH=prod
export REVISION=latest
export COMPOSE_PROJECT_NAME=$PROJECT_PATHNAME

docker-compose -f build.yml -f prod.yml build
docker-compose -f build.yml -f prod.yml up -d