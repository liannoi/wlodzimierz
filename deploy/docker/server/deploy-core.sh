#!/bin/sh

docker-compose -f docker-compose.core.yml pull &&
docker-compose -f docker-compose.core.yml build &&
docker-compose -f docker-compose.core.yml up -d
