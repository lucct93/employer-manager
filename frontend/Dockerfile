FROM node:alpine

WORKDIR /data/www

COPY package.json ./

RUN apk add --no-cache python3 make g++
RUN yarn install --production
RUN yarn add --dev typescript @types/node
COPY . .

ENV NODE_ENV=production
RUN yarn build

CMD ["npm", "run","start"]