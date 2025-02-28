FROM node:23-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm cache clean --force
RUN npm install

COPY . ./
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]








