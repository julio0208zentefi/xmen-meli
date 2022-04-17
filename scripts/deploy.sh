#!/bin/bash

scriptPath="$(realpath "$0")"
scriptDir="$(dirname "$scriptPath")"
projectDir="${scriptDir}/../"

cd "$projectDir"


cp api/.env.prod api/.env

docker-compose stop -t 1;
docker-compose rm -f;

docker-compose build;

docker-compose up -d;

