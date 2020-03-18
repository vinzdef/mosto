#!/bin/bash
source .env

export REGISTRY_HOST=localhost
export PROJECT_PATHNAME=${PWD##*/}
export BRANCH=development
export REVISION=latest
export COMPOSE_PROJECT_NAME=$PROJECT_PATHNAME

docker-compose -f build.yml -f dev.yml $@