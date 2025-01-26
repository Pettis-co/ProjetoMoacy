# This code is part of the application petis.co and cannot be distributed.
# All rights reserved to BlueTech team
# Written by @igor.oliveira

#!/bin/bash

if [ -z  $(cat version.txt 2> /dev/null) ]; then
	VERSION="1"
    else
	VERSION=$(cat version.txt)  
fi
IMAGE_NAME="local/petis.co"

CURRENT_VERSION=$IMAGE_NAME:v0.$VERSION 

#increments the version counter
echo $((VERSION + 1)) > version.txt

docker rmi -f $IMAGE_NAME:v0.$((VERSION - 1)) 2> /dev/null
docker rm -f $IMAGE_NAME:v0.$((VERSION - 1)) 2> /dev/null

echo "DOCKER_TAG=$CURRENT_VERSION" > .env
