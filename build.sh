#!/bin/bash
cd $CI_PROJECT_DIR
docker-compose build >> /usr/share/nginx/html/logs/solidbytes-assignment-be-build
docker-compose up -d >> /usr/share/nginx/html/logs/solidbytes-assignment-be-build
echo "=======================$CI_COMMIT_SHORT_SHA==========================" >> /usr/share/nginx/html/logs/solidbytes-assignment-be-build
echo "=======================$(date)==========================" >> /usr/share/nginx/html/logs/solidbytes-assignment-be-build
echo "=======================$CI_COMMIT_SHORT_SHA==========================" >> /usr/share/nginx/html/logs/solidbytes-assignment-be.txt
echo "=======================$(date)==========================" >> /usr/share/nginx/html/logs/solidbytes-assignment-be.txt
