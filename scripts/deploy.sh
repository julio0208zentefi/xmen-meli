#!/bin/bash

scriptPath="$(realpath "$0")"
scriptDir="$(dirname "$scriptPath")"
projectDir="${scriptDir}/../"

cd "$projectDir"

git reset --hard
git fetch
git checkout master
git pull

cp api/.env.prod api/.env

docker-compose stop -t 1;
docker-compose rm -f;

docker-compose build;

cd api;
npm i dotenv;
cd ..;

docker-compose up -d;