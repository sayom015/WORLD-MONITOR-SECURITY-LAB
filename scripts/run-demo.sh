#!/bin/bash
echo "Installing dependencies..."
npm install

echo "Starting Vulnerable App..."
node vulnerable-app/app.js &
VULN_PID=$!

echo "Starting Secure App..."
node secure-app/app.js &
SEC_PID=$!

echo "Starting Dashboard..."
node dashboard/server.js &
DASH_PID=$!

echo "Waiting for servers to start..."
sleep 3

echo "Running automated security tests (and updating dashboard)..."
node security-tests/run-tests.js

echo "Tests complete. Dashboard is running at http://localhost:4000"
echo "Press Enter to stop all servers and exit..."
read -r

echo "Stopping servers..."
kill $VULN_PID
kill $SEC_PID
kill $DASH_PID

echo "Demo Complete."
