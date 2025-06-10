# Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Injecter la variable d'env AVANT le build
ENV NEXT_IGNORE_ESLINT_ERRORS=true

# Prisma client
RUN npx prisma generate

# Port
EXPOSE 3000

# Build + start app
RUN npm run build
CMD ["npm", "start"]
