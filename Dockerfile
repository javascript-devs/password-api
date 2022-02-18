FROM node:lts-alpine as ts-compiler
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json .
COPY tsconfig*.json .
RUN  yarn install
COPY . ./
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["yarn", "start"]
