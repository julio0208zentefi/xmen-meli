#!/bin/bash

scriptPath="$(realpath "$0")"
scriptDir="$(dirname "$scriptPath")"
projectDir="${scriptDir}/../"

cd "$projectDir"

git reset --hard
git pull