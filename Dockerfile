# Dockerfile

#Slim allège le build par rapport à alpine
FROM node:18-slim

WORKDIR /app

# Installer OpenSSL requis par Prisma
RUN apt-get update -y && apt-get install -y openssl

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
