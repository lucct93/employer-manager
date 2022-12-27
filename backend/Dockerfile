
FROM node:16.14-alpine3.14

WORKDIR /todoapp

COPY ./backend/package*.json ./backend/yarn.lock ./backend/config /todoapp/

RUN yarn add glob rimraf

RUN yarn install --only=development

COPY ./backend/ /todoapp/

RUN yarn run build

CMD ["yarn", "start:prod", "/todoapp/"]
