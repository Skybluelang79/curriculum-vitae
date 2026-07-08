$ErrorActionPreference = "Stop"
$port = 3000
$dir = "C:\Users\HP\OneDrive\Desktop\HTML,CSS,JAVASCRIPT LEVEL 1&2\work\Alex Portfolio"

Write-Host "Starting Python HTTP Server..."

$process = Start-Process -FilePath "python" -ArgumentList "-m http.server $port" -WorkingDirectory $dir -PassThru -WindowStyle Normal

Start-Sleep -Seconds 2

if ($process.HasExited) {
    Write-Host "Python not found, trying Node.js..."
    $process = Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory $dir -PassThru
    Start-Sleep -Seconds 2
}

if ($process.HasExited) {
    Write-Host "Error: Could not start server"
    exit 1
} else {
    Write-Host ""
    Write-Host "========================================"
    Write-Host "Server running at: http://localhost:$port"
    Write-Host "========================================"
    Write-Host ""
    Write-Host "Press any key to stop server..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    Stop-Process $process.Id -Force -ErrorAction SilentlyContinue
}