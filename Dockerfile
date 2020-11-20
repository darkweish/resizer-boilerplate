FROM node:14
RUN npm install -g sails

RUN mkdir /app
COPY . /app

WORKDIR /app

RUN npm install
RUN npm start
