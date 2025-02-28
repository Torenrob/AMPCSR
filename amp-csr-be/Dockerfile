FROM ubuntu:latest

RUN apt update && apt install -y \
    curl \ 
    ca-certificates

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt install -y nodejs && \
    apt clean && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/app

COPY package*.json ./
RUN npm cache clean --force
RUN npm install

COPY . .

RUN npm run build

EXPOSE 4400

CMD ["npm", "run", "start:prod"]
