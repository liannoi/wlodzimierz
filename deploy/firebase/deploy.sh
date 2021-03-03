#!/bin/sh

cd ../../src/Clients/web-spa || return
ng build --prod &&
nx build wlodzimierz --prod &&
firebase deploy
