FROM node:current-alpine

ENV NODE_VERSION 16.13.2

WORKDIR /app
ADD package.json ./
ADD prisma ./prisma/
ADD . .


RUN npm install
RUN npm run build

ENTRYPOINT [ "npm", "run", "start:migrate:prod" ]
