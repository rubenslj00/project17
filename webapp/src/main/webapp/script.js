#!/bin/bash
#Description: clean my docker images
#Date: 3/9/2020
#Author: Ruben Louis jean

#echo -e "\n Cleanup docker images"
docker rmi -f $(docker images | grep -w "<none>" | awk {print $3})

# Do not run if removal already in progress.
pgrep "docker rm" && exit 0

#Delete docker images older then one month.
docker rmi -f $(docker images | awk '{print $3,$4,$5}' | grep '[5-9]\{1\}\ weeks\|years\|months' | awk '{print $1}')

# Remove Dead and Exited containers.
docker rm $(docker ps -a | grep "Dead\|Exited" | awk '{print $1}'); true

# It will fail to remove images currently in use.
docker rmi $(docker images -qf dangling=true); true

# Clean up unused docker volumes
docker volume rm $(docker volume ls -qf dangling=true); true

#Delete or clean up unused docker volumes.
docker rmi -f $(docker volume ls -qf dangling=true)
~

