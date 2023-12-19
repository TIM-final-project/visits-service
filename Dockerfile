FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i -g @nestjs/cli
RUN npm install
RUN npm link webpack
COPY . .
EXPOSE 3004
CMD [ "npm", "run", "start" ]