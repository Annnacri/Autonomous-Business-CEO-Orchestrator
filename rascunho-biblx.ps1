param(
  [Parameter(Mandatory = $true)]
  [string]$Task
)

$context = "breakfastinbedlx.com (pequenos-almoços artesanais em Lisboa). Zonas autorizadas apenas para já: Penha de França, Graça, São Vicente, Santa Clara, Alfama, Santa Apolónia e Arroios (não atuar fora destas zonas). Público: Alojamentos Locais (AL) e qualquer turista hospedado nessas zonas. Regras: $0 gasto não autorizado; gerar apenas rascunhos/planos para revisão manual, sem enviar mensagens automaticamente."

$payload = @{
  task    = $Task
  context = $context
} | ConvertTo-Json -Compress

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$tmpJson = Join-Path $PWD "temp_rascunho.json"
[System.IO.File]::WriteAllText($tmpJson, $payload, $utf8NoBom)

$rawOut = .\node_modules\.bin\vercel.cmd curl https://autonomous-business-ceo-orchestrato.vercel.app/api/agents -- -X POST -H "Content-Type: application/json" -d "@temp_rascunho.json"
Remove-Item $tmpJson -Force

$jsonLine = ($rawOut | Where-Object { $_ -match '^\s*\{' } | Select-Object -Last 1)
if (-not $jsonLine) {
  Write-Host "Sem resposta JSON válida:" -ForegroundColor Red
  $rawOut
  exit 1
}

$data = $jsonLine | ConvertFrom-Json
if (-not $data.success) {
  Write-Host "Erro do endpoint:" -ForegroundColor Red
  $jsonLine
  exit 1
}

$outDir = Join-Path $PWD "rascunhos"
if (-not (Test-Path $outDir)) {
  New-Item -ItemType Directory -Path $outDir | Out-Null
}

$stamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$outFile = Join-Path $outDir "rascunho_$stamp.txt"

$r = $data.result
$acoes = ($r.nextActions | ForEach-Object { "- $_" }) -join "`r`n"

$texto = @"
DATA: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
PEDIDO: $Task
MODO: Rascunho local (sem envio automatico / $0 gasto nao autorizado)

=== CEO ===
$($r.ceoDecision)

=== COMERCIAL (ALs & Turistas) ===
$($r.commercialAgent)

=== OPERACOES (7 Zonas Lisboa) ===
$($r.operationsAgent)

=== PROXIMOS PASSOS ===
$acoes
"@

[System.IO.File]::WriteAllText($outFile, $texto, $utf8NoBom)
Write-Host "Rascunho guardado em: $outFile" -ForegroundColor Green
Get-Content $outFile