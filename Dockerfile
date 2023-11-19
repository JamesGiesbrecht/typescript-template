FROM node:18 AS base

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

FROM base AS dev
CMD ["yarn", "dev"]

FROM node:18 AS prod

WORKDIR /app

ENV NODE_ENV=production

COPY package.json .
COPY yarn.lock .
RUN yarn install --production

COPY --from=base /app/dist/ /app/dist/

CMD ["node", "dist/index.js"]
