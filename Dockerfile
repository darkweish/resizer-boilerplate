FROM node:14

RUN mkdir /app
COPY . /app

WORKDIR /app

RUN npm install
RUN npm start
