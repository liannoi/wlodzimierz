#!/bin/sh

docker context use default &&
docker-compose pull &&
docker-compose up --build -d &&
docker-compose down &&
docker-compose push &&
docker context use wlodzimierz &&
docker compose up &&
docker ps &&
docker context use default
