# This code is part of the application petis.co and cannot be distributed.
# All rights reserved to BlueTech team
# Written by @igor.oliveira

#!/bin/bash

VERSION=$(cat version.txt || echo "1")
IMAGE_NAME="local/petis.co"
CURRENT_VERSION= $IMAGE_NAME:v0.$VERSION 

#increments the version counter
echo $((VERSION + 1)) > version.txt

docker rmi -f $IMAGE_NAME:v0.$((VERSION - 1)) 2> /dev/null
docker rm -f $IMAGE_NAME:v0.$((VERSION - 1)) 2> /dev/null

echo $CURRENT_VERSION
