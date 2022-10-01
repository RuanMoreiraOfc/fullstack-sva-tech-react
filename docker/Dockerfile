ARG DOCKER_NODE_VERSION=16.17.0-bullseye-slim

FROM node:$DOCKER_NODE_VERSION
RUN apt-get -y update
RUN apt-get -y install git

WORKDIR /home/app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lockfile

COPY . .

CMD ["yarn", "dev"]