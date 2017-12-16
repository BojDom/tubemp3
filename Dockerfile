FROM node:alpine
COPY . /app
RUN apk add --no-cache bash git openssh python
WORKDIR /app
RUN npm i --only=production
RUN npm i -g pm2