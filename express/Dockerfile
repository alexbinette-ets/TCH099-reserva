FROM node:21
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm ci
COPY . .
EXPOSE 5000
CMD ["npm", "run-script","dev"]

