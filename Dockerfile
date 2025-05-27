FROM node:22

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g typescript

RUN npm install -g heroku-cli

EXPOSE 3000

CMD ["npm", "run", "dev"]
