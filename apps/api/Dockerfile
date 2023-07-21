FROM node:18.16.1-slim AS development

RUN npm i -g @nestjs/cli@10.1.9

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn add glob rimraf

RUN yarn install --production

COPY . .

RUN yarn build

# ------------------------------------------------------

FROM node:18.16.1-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY --from=development /usr/src/app/dist ./dist

CMD yarn start:${STAGE}