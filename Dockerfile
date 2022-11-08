FROM node:18

WORKDIR /media/repositorio-ubun/www/alura/imersao/react_

COPY package*.json ./

RUN npm install
# código em produção
# RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev" ]
