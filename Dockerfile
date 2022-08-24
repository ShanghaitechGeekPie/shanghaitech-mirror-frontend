# Build Stage
FROM node:lts-alpine as build-stage
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install
COPY . ./
RUN pnpm build

# Production Stage
FROM peytonyip/nginx-brotli as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY start.sh /start.sh

# Fetch Node Exporter
RUN curl -L \
    https://github.com/prometheus/node_exporter/releases/download/v1.3.1/node_exporter-1.3.1.linux-amd64.tar.gz \
    --output /tmp/node_exporter-1.3.1.linux-amd64.tar.gz && \
    tar -xzf /tmp/node_exporter-1.3.1.linux-amd64.tar.gz -C /tmp && \
    mv /tmp/node_exporter-1.3.1.linux-amd64/node_exporter /usr/local/bin/

# Packages for Git HTTP Backend
RUN apk add --update git-daemon fcgiwrap spawn-fcgi && rm -rf /var/cache/apk/*

EXPOSE 80
CMD ["/start.sh"]
