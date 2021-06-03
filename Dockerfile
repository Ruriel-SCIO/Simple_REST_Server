FROM node:lts-alpine3.13
ENV PROJECT_DIR /server
WORKDIR ${PROJECT_DIR}
COPY ./package.json ${PROJECT_DIR}/
COPY ./app ${PROJECT_DIR}/app
COPY ./config ${PROJECT_DIR}/config
COPY ./main.js ${PROJECT_DIR}/
RUN npm install
ENTRYPOINT [ "npm", "start" ]