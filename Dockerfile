#Uses the Node Alpine as base for being the lightest one.
FROM node:lts-alpine3.13 as build
WORKDIR /server
#Copies the less changed files to the server folder.
COPY ./package.json ./main.js /server/
#Copies the rest of the code.
COPY ./app /server/app
#Copies the server config.
COPY ./config /server/config
#Install productions dependencies and removes development dependencies for each one.
RUN npm install --production && npm prune --production
ENTRYPOINT [ "npm", "start"]