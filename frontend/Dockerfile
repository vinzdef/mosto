FROM node:11-alpine AS modules
WORKDIR /app
RUN apk add --no-cache git --update
COPY ./app/package.json ./
COPY ./app/package-lock.json ./
RUN npm install

FROM node:11-alpine
WORKDIR /app
COPY ./app/ ./
COPY ./entrypoint.sh /usr/bin/entrypoint
COPY --from=modules /app/node_modules ./node_modules
RUN npm run build
ENTRYPOINT [ "entrypoint" ]