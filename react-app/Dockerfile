FROM node:21
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run-script","start"]
