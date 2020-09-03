FROM node:lts-alpine
RUN apk add --no-cache bash
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8000

CMD ["npm","start"]
