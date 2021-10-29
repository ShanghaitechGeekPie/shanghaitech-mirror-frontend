# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
RUN curl -L https://github.com/prometheus/node_exporter/releases/download/v1.2.2/node_exporter-1.2.2.linux-amd64.tar.gz -output /tmp/node_exporter-1.2.2.linux-amd64.tar.gz && \
    tar -xzf /tmp/node_exporter-1.2.2.linux-amd64.tar.gz -C /tmp && \
    mv /tmp/node_exporter-1.2.2.linux-amd64/node_exporter /usr/local/bin/ && \
    mv /app/40-start-node-exporter.sh /docker-entrypoint.d
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]