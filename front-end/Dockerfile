FROM node:18.19 AS dev

WORKDIR /app
RUN npm i -g npm@10.2.3

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

EXPOSE 5170

CMD ["npm", "run", "dev"]