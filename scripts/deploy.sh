#!/bin/bash

cd /root/xmen-meli

docker-compose stop -t 1;
docker-compose rm -f;

git pull --no-edit origin master

cp api/.env.prod api/.env

docker-compose build;

docker-compose up -d;

cd api;
npm i dotenv;
cd ..;

docker-compose up -d;