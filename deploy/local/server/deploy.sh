#!/bin/sh

docker-compose -f docker-compose.dev.yml pull &&
docker-compose -f docker-compose.dev.yml up --build -d
