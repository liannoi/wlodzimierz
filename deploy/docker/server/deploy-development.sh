#!/bin/sh

docker-compose -f docker-compose.development.yml pull &&
docker-compose -f docker-compose.development.yml build &&
docker-compose -f docker-compose.development.yml up -d
