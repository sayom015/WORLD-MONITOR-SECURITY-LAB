# Start the Security Assessment Lab

Write-Host "Installing dependencies..."
npm install

Write-Host "Starting Vulnerable App..."
Start-Process node -ArgumentList "vulnerable-app/app.js" -NoNewWindow

Write-Host "Starting Secure App..."
Start-Process node -ArgumentList "secure-app/app.js" -NoNewWindow

Write-Host "Waiting for servers to start..."
Start-Sleep -Seconds 3

Write-Host "Running automated security tests..."
node security-tests/run-tests.js

Write-Host "Stopping servers..."
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue

Write-Host "Demo Complete."
