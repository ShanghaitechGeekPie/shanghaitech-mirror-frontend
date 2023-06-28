# Build Stage
FROM sawacl/node-pnpm as build-stage
WORKDIR /app
COPY . ./
RUN pnpm install && pnpm build

# Production Stage
FROM georgjung/nginx-brotli as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY start.sh /start.sh

# Packages for Git HTTP Backend
RUN apt update && apt install git fcgiwrap spawn-fcgi curl -y

# Fetch Node Exporter
RUN curl -L \
    https://github.com/prometheus/node_exporter/releases/download/v1.5.0/node_exporter-1.5.0.linux-amd64.tar.gz \
    -o /tmp/node_exporter.tar.gz && tar -xzf /tmp/node_exporter.tar.gz -C /tmp && \
    mv /tmp/node_exporter-1.5.0.linux-amd64/node_exporter /usr/local/bin/node_exporter

# Fetch Git CGI Server
RUN curl -L \
    https://github.com/pasela/git-cgi-server/releases/download/v1.0.1/git-cgi-server-linux-amd64 \
    -o /usr/bin/git-cgi-server && chmod +x /usr/bin/git-cgi-server

# Fetch and install the vindex
RUN curl -L https://github.com/wenxuanjun/vindex/releases/download/default/vindex \
    -o /usr/bin/vindex && chmod +x /usr/bin/vindex

# Set executable permission
RUN chmod +x /start.sh

EXPOSE 80
CMD ["/start.sh"]
