#!/bin/sh

# Timezone (Bad but I need)
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# Rindex
rindex -d /mirrors -a 127.0.0.1 -p 3500 -f /mirrors/logs/rindex -v &

# Git HTTP Backend
MULTIWATCH_CMD="/usr/bin/multiwatch -f $(nproc) -- /usr/sbin/fcgiwrap"
spawn-fcgi -s /var/run/fcgiwrap.sock -- $MULTIWATCH_CMD && chmod 777 $SOCKET_PATH

# Start Nginx
nginx -g "daemon off;"
