#!/bin/sh

set -e

node_exporter --collector.disable-defaults --collector.filesystem --collector.cpu --collector.cpufreq --collector.diskstats --collector.meminfo --collector.netdev --collector.netclass &
nginx -g "daemon off;"