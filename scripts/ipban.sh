#!/bin/bash

BLOCK_TIME_MINUTES=$2
BLOCK_TIME_SECONDS=$((BLOCK_TIME_MINUTES * 60))
MAX_RETRIES=2

CSV_FILE="blocked_ips.csv"

function block_ip() {
  local ip=$1
  local end_time=$(( $(date +%s) + BLOCK_TIME_SECONDS ))
  local retries=0

  while [ $retries -lt $MAX_RETRIES ]; do
    if ufw deny from $ip &> /dev/null; then
      ufw delete deny from $ip
    fi

    if ! awk -F',' -v ip="$ip" '$1 == ip' "$CSV_FILE" | grep -q .; then
      echo "$ip,$end_time" >> "$CSV_FILE"
    fi

    INTERFACE=$(/usr/sbin/ip route | grep default | awk '{print $5}')

    if /usr/sbin/ufw insert 1 deny from $ip && /usr/sbin/tcpkill -i $INTERFACE host $ip; then
      echo "Banned ip in $INTERFACE. IP - $ip | END - $end_time"
      return 0
    else
      echo "Failed to ban IP $ip. Retrying..."
      retries=$((retries + 1))
      sleep 1 
    fi
  done

  echo "Exceeded maximum number of retries. Failed to ban IP $ip."
  return 1 
}

block_ip $1
