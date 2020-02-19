#!/bin/bash
export BRANCH=development
export PROJECT_PATHNAME=stucco
export REVISION=latest
export REGISTRY_HOST=localhost
docker-compose -f build.yml -f dev.yml $@