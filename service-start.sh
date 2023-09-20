#!/bin/sh

# Timezone (Bad but I need)
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# Node Monitor
node_exporter \
--collector.disable-defaults \
--collector.filesystem \
--collector.cpu \
--collector.cpufreq \
--collector.diskstats \
--collector.meminfo \
--collector.netdev \
--collector.netclass &

# Rindex
rindex -d /mirrors -a 127.0.0.1 -p 3500 -f /mirrors/logs/rindex -v &

# Git HTTP Backend
spawn-fcgi -s /var/run/fcgiwrap.sock -- /usr/bin/multiwatch -f $(nproc) -- /usr/sbin/fcgiwrap && chmod 777 /var/run/fcgiwrap.sock
git-cgi-server --export-all /mirrors &

# Start Nginx
nginx -g "daemon off;"