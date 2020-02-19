#!/bin/bash
export REGISTRY_HOST=localhost
export PROJECT_PATH=localhost
export GIT_REF=development
docker-compose -f build.yml -f dev.yml $@