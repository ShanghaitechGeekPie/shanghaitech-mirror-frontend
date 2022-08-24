#!/bin/sh

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

# Git HTTP Backend
spawn-fcgi -s /var/run/fcgiwrap.sock /usr/bin/fcgiwrap && chmod 777 /var/run/fcgiwrap.sock

# Start Nginx
nginx -g "daemon off;"