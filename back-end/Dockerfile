FROM node:18.19 AS dev

WORKDIR /app
RUN npm i -g npm@10.2.3

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]