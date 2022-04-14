FROM node:14

WORKDIR /usr/src/api-app
COPY . .
RUN npm install

EXPOSE 80
CMD [ "npm", "run", "start-watch" ]
