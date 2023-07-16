FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
ENV PATH app/node_modules/.bin:$PATH

RUN npm ci --silent

COPY . .

RUN npm run build

COPY .env .env

CMD ["sh", "-c", "source .env && npm run dev -- --host"]
