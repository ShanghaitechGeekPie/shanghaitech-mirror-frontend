# Build Stage
FROM jitesoft/node-yarn as build-stage
WORKDIR /app
COPY . ./
RUN yarn && yarn build

# Production Stage
FROM imraango/nginx-http3 as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY start.sh /start.sh

# Packages for Git HTTP Backend
RUN apk add --update git-daemon fcgiwrap spawn-fcgi curl && rm -rf /var/cache/apk/*

# Fetch Node Exporter
RUN curl -L \
    https://github.com/prometheus/node_exporter/releases/download/v1.5.0/node_exporter-1.5.0.linux-amd64.tar.gz \
    -o /tmp/node_exporter.tar.gz && tar -xzf /tmp/node_exporter.tar.gz -C /tmp && \
    mv /tmp/node_exporter-1.5.0.linux-amd64/node_exporter /usr/local/bin/

# Fetch and install the vindex
RUN curl https://cdn.jsdelivr.net/gh/wenxuanjun/vindex/vindex -o /usr/bin/vindex && chmod +x /usr/bin/vindex

EXPOSE 80
CMD ["/start.sh"]
