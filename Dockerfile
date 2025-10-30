# Build Stage
FROM oven/bun as build-stage
WORKDIR /app
COPY . ./
RUN bun install && bun build

# Production Stage
FROM georgjung/nginx-brotli as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY service-start.sh /service-start.sh

# Packages for Git HTTP Backend
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        git fcgiwrap spawn-fcgi \
        multiwatch curl ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Fetch and install the rindex
RUN curl -L https://github.com/wenxuanjun/rindex/releases/download/default/rindex \
    -o /usr/bin/rindex && chmod +x /usr/bin/rindex

# Set executable permission
RUN chmod +x /service-start.sh

EXPOSE 80
CMD ["/service-start.sh"]
