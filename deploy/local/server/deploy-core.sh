#!/bin/sh

cd  ../../../src || exit
docker-compose -f docker-compose.core.yml pull &&
docker-compose -f docker-compose.core.yml up --build -d
