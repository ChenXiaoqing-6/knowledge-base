FROM registry.dev.coresuite.com/docker-base-webapp-nodejs-nginx:1.0.1

RUN rm -rf backend/* && rm -rf frontend/*

COPY ./backend/release backend

COPY ./frontend/release frontend
