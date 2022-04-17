#!/bin/bash

cd /root/xmen-meli

cp api/.env.prod api/.env

docker-compose stop -t 1;
docker-compose rm -f;

docker-compose build;

docker-compose up -d;

cd api;
npm i dotenv;
cd ..;

docker-compose up -d;