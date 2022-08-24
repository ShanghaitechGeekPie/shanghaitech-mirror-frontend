#!/bin/sh

set -e

node_exporter --collector.disable-defaults --collector.filesystem --collector.cpu --collector.cpufreq --collector.diskstats --collector.meminfo --collector.netdev --collector.netclass &
spawn-fcgi -s /var/run/fcgiwrap.sock /usr/bin/fcgiwrap
nginx -g "daemon off;"