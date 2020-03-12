#!/bin/bash
#Description: clean my docker images
#Date: 3/9/2020
#Author: Ruben Louis jean

#echo -e "\n Cleanup docker images"
docker rmi  $(docker images) > /dev/null 2>&1

#stop container
docker container stop $(docker container ls -aq) > /dev/null 2>&1

# Remove Dead and Exited containers.
docker container rm $(docker container ls -aq) > /dev/null 2>&1

