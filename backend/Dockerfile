FROM node:14.16.0-alpine3.10

WORKDIR /usr/app/

COPY package*.json ./

RUN npm install nodemon 
RUN npm install -qy

COPY . .
RUN ls

#RUN chmod +x /usr/app/node_modules/.bin/nodemon
EXPOSE 3002

CMD ["npm", "start"]