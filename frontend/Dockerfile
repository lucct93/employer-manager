FROM node:alpine

WORKDIR /data/www

RUN apk add --no-cache python3 make g++

COPY package.json ./
COPY yarn.lock ./
RUN yarn 

COPY . .

CMD ["yarn","dev"]