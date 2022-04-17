#!/bin/bash

cd /usr/src/api-app

npm run "config-oauth2-redis"

if [ "$WATCH_CHANGES" == "true" ]; then
  npm run "start-app-watch"
else
  npm run "start-app"
fi;