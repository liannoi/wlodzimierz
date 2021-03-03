#!/bin/sh

cd ../../src || return
az acr build --registry wlodzimierz --image wlodzimierz --file Layers/Presentation/Presentation.API/Dockerfile .
