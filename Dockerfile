FROM node:8-alpine
ADD . /app
RUN apk update && apk add git python make
WORKDIR /app
RUN npm i --only=production
RUN npm i -g pm2
