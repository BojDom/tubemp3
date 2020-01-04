FROM node:alpine
ADD . /app
RUN apk update && apk add git python
WORKDIR /app
RUN npm i --only=production
ENV PATH "$PATH:/app/node_modules/.bin/"
