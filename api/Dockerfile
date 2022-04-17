FROM node:14

WORKDIR /usr/src/api-app
COPY . .
RUN npm install

EXPOSE 443
EXPOSE 80
CMD [ "/start.sh" ]
