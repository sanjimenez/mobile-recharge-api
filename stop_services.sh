#!/bin/bash

PORTS=(3001 3002)
STOPPED=false

for PORT in "${PORTS[@]}"; do
  PID=$(lsof -ti :$PORT)
  if [ -n "$PID" ]; then
    kill $PID
    echo "Stopped service on port $PORT (PID $PID)."
    STOPPED=true
    echo "All services have been stopped."
  fi
done

if [ "$STOPPED" = false ]; then
  echo "No running services found on ports ${PORTS[*]}."
fi
