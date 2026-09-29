$ErrorActionPreference = "Stop"
$port = 3000
$dir = $PSScriptRoot

Set-Location -LiteralPath $dir

if (-not (Test-Path -LiteralPath "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
}

$process = Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory $dir -PassThru -WindowStyle Normal
Start-Sleep -Seconds 2

if ($process.HasExited) {
    Write-Host "Error: Could not start server. Is Node.js installed?"
    exit 1
}

Write-Host ""
Write-Host "========================================"
Write-Host "Server running at: http://localhost:$port"
Write-Host "========================================"
Write-Host ""
Write-Host "Press any key to stop the server..."

try {
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
} catch {
    Read-Host "Press Enter to stop the server" | Out-Null
}

Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
