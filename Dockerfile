FROM node:alpine
COPY . /app
RUN apk update && apk add git python make
WORKDIR /app
RUN npm i --only=production
RUN npm i -g pm2
