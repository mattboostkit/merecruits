# PowerShell script to run Convex dev with proper Windows configuration
# This prevents the infinite loop issue on Windows

# Set environment variables to reduce file watcher sensitivity
$env:CHOKIDAR_USEPOLLING = "false"
$env:CHOKIDAR_INTERVAL = "1000"
$env:CONVEX_WATCH_DEBOUNCE_MS = "500"

Write-Host "Starting Convex dev with Windows-optimized settings..." -ForegroundColor Green
Write-Host "This should prevent the infinite loop issue." -ForegroundColor Yellow

# Run convex dev
npx convex dev
