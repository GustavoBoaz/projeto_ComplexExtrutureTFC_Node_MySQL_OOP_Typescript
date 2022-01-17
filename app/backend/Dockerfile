FROM node:14-alpine

WORKDIR /backend/app

COPY . .

COPY package*.json ./

RUN npm install

EXPOSE 3001

CMD ["sh", "-c", "npx sequelize-cli db:drop ; npx sequelize-cli db:create ; npx sequelize-cli db:migrate ; npx sequelize-cli db:seed:all ; npm start" ]