# Start the Security Assessment Lab Demo

Write-Host "Installing dependencies..."
npm install

Write-Host "Starting Vulnerable App..."
Start-Process node -ArgumentList "vulnerable-app/app.js" -NoNewWindow

Write-Host "Starting Secure App..."
Start-Process node -ArgumentList "secure-app/app.js" -NoNewWindow

Write-Host "Starting Dashboard..."
Start-Process node -ArgumentList "dashboard/server.js" -NoNewWindow

Write-Host "Waiting for servers to start..."
Start-Sleep -Seconds 3

Write-Host "Running automated security tests (and updating dashboard)..."
node security-tests/run-tests.js

Write-Host "Tests complete. Dashboard is running at http://localhost:4000"
Write-Host "Press any key to stop all servers and exit..."
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host "Stopping servers..."
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue

Write-Host "Demo Complete."
