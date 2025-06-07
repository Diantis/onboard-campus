# Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

RUN npm run build
CMD ["npm", "start"]

