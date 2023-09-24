# Build Stage
FROM sawacl/node-pnpm as build-stage
WORKDIR /app
COPY . ./
RUN pnpm install && pnpm build

# Production Stage
FROM georgjung/nginx-brotli as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY service-start.sh /start.sh

# Packages for Git HTTP Backend
RUN apt update && apt install git fcgiwrap spawn-fcgi multiwatch curl -y && apt clean && rm -rf /var/lib/apt/lists/*

# Fetch Node Exporter
RUN curl -L \
    https://github.com/prometheus/node_exporter/releases/download/v1.5.0/node_exporter-1.5.0.linux-amd64.tar.gz \
    -o /tmp/node_exporter.tar.gz && tar -xzf /tmp/node_exporter.tar.gz -C /tmp && \
    mv /tmp/node_exporter-1.5.0.linux-amd64/node_exporter /usr/local/bin/node_exporter

# Fetch and install the rindex
RUN curl -L https://github.com/wenxuanjun/rindex/releases/download/default/rindex \
    -o /usr/bin/rindex && chmod +x /usr/bin/rindex

# Set executable permission
RUN chmod +x /start.sh

EXPOSE 80
CMD ["/start.sh"]
