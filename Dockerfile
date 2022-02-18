# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# production stage
FROM peytonyip/nginx-brotli as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY start.sh /start.sh
RUN curl -L https://github.com/prometheus/node_exporter/releases/download/v1.2.2/node_exporter-1.2.2.linux-amd64.tar.gz --output /tmp/node_exporter-1.2.2.linux-amd64.tar.gz && \
    tar -xzf /tmp/node_exporter-1.2.2.linux-amd64.tar.gz -C /tmp && \
    mv /tmp/node_exporter-1.2.2.linux-amd64/node_exporter /usr/local/bin/
EXPOSE 80
CMD ["/start.sh"]
