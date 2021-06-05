FROM node:lts-alpine3.13 as build
WORKDIR /server
COPY ./package.json ./main.js /server/
COPY ./app /server/app
COPY ./config /server/config
RUN npm install --production && npm prune --production
ENTRYPOINT [ "npm", "start"]