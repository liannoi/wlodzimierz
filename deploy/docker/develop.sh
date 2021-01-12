#!/bin/sh

docker-compose -f docker-compose.develop.yml pull &&
docker-compose -f docker-compose.develop.yml build &&
docker-compose -f docker-compose.develop.yml up -d
