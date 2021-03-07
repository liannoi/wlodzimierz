#!/bin/sh

cd  ../../../src
docker-compose -f docker-compose.core.yml pull &&
docker-compose -f docker-compose.core.yml up --build -d
