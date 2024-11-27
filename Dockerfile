FROM node:20.16.0-alpine3.20 as build
WORKDIR /usr/app
COPY . /usr/app

ARG DEPLOY_ENV
COPY .env.${DEPLOY_ENV}.template .env

RUN yarn install
RUN yarn build:${DEPLOY_ENV}

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html
