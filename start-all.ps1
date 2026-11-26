$root = $PSScriptRoot

$servers = @(
    @{Name="CEO"; Folder="."; Port=3000},
    @{Name="Market Intelligence"; Folder="agents\Autonomous-Market-Intelligence"; Port=3101},
    @{Name="Business Strategy"; Folder="agents\Business-Strategy-Growth-Analyst"; Port=3102},
    @{Name="Financial Intelligence"; Folder="agents\Financial-Intelligence-Revenue-Optimization"; Port=3103},
    @{Name="Global Opportunity Hunter"; Folder="agents\Global-Opportunity-Hunter"; Port=3104},
    @{Name="Research Agent"; Folder="agents\Market-Intelligence-Research-Agent"; Port=3105}
)

foreach ($s in $servers) {
    $online = Test-NetConnection 127.0.0.1 -Port $s.Port -InformationLevel Quiet -WarningAction SilentlyContinue

    if ($online) {
        Write-Host "[ONLINE] $($s.Name)" -ForegroundColor Green
    } else {
        Write-Host "[STARTING] $($s.Name)" -ForegroundColor Yellow
        Start-Process powershell.exe -WorkingDirectory (Join-Path $root $s.Folder) -ArgumentList '-NoExit','-NoProfile','-Command','npm run dev'
        Start-Sleep -Seconds 3
    }
}

Write-Host "`nARRANQUE SOLICITADO. A verificar portas..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

foreach ($s in $servers) {
    $online = Test-NetConnection 127.0.0.1 -Port $s.Port -InformationLevel Quiet -WarningAction SilentlyContinue
    if ($online) {
        Write-Host "[ONLINE] $($s.Name) - Port $($s.Port)" -ForegroundColor Green
    } else {
        Write-Host "[OFFLINE] $($s.Name) - Port $($s.Port)" -ForegroundColor Red
    }
}
