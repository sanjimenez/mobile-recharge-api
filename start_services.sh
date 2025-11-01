#!/bin/bash
cd yuno-mock-service
echo "Installing dependencies in yuno-mock-service..."
npm install
npm run test
npm run test:e2e
npm run start:dev &

echo "Installing dependencies in recharge-service..."
cd ../recharge-service
npm install
npm run test
npm run test:e2e
npm run start:dev &


echo "Both services are running in the background."
