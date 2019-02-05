FROM node:8-alpine
RUN apk update && apk add git python make
WORKDIR /app
RUN npm i --only=production
RUN npm i -g pm2
