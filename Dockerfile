FROM node:slim
COPY . /app
RUN apt update && apt install git -y #python
WORKDIR /app
RUN npm i --only=production
RUN npm i -g pm2
