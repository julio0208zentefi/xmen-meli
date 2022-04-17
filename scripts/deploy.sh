#!/bin/bash

scriptPath="$(realpath "$0")"
scriptDir="$(dirname "$scriptPath")"
projectDir="${scriptDir}/../"

cd "$projectDir"

git reset --hard
git fetch
git checkout master
git pull

docker-compose stop -t 1;
docker-compose rm -f;

docker-compose build;

docker-compose up -d;