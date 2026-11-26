param(
  [Parameter(Mandatory = $true)]
  [string]$Task
)

function Format-AgentValue {
  param($Val, [int]$Indent = 0)
  $pad = "  " * $Indent
  if ($null -eq $Val) { return "" }
  if ($Val -is [string] -or $Val -is [ValueType]) {
    return "$pad$Val"
  }
  if ($Val -is [System.Collections.IEnumerable]) {
    $lines = foreach ($item in $Val) {
      if ($item -is [string] -or $item -is [ValueType]) {
        "$pad- $item"
      } else {
        Format-AgentValue -Val $item -Indent ($Indent + 1)
      }
    }
    return ($lines -join "`r`n")
  }
  $props = $Val.PSObject.Properties
  $out = foreach ($p in $props) {
    $v = $p.Value
    if ($v -is [string] -or $v -is [ValueType]) {
      "$pad[$($p.Name)]: $v"
    } else {
      "$pad[$($p.Name)]:`r`n" + (Format-AgentValue -Val $v -Indent ($Indent + 1))
    }
  }
  return ($out -join "`r`n")
}

$context = "breakfastinbedlx.com (pequenos-almocos artesanais em Lisboa). Zonas autorizadas apenas para ja: Penha de Franca, Graca, Sao Vicente, Santa Clara, Alfama, Santa Apolonia e Arroios (nao atuar fora destas zonas). Publico: Alojamentos Locais (AL) e qualquer turista hospedado nessas zonas. Regras: 0 euros de gasto nao autorizado; gerar apenas rascunhos/planos para revisao manual, sem enviar mensagens automaticamente."

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
  Write-Host "Sem resposta JSON valida:" -ForegroundColor Red
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
$ceoText = Format-AgentValue -Val $r.ceoDecision
$comText = Format-AgentValue -Val $r.commercialAgent
$opsText = Format-AgentValue -Val $r.operationsAgent
$acoes   = Format-AgentValue -Val $r.nextActions

$texto = @"
DATA: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
PEDIDO: $Task
MODO: Rascunho local (sem envio automatico / 0 gasto nao autorizado)

=== CEO ===
$ceoText

=== COMERCIAL (ALs & Turistas) ===
$comText

=== OPERACOES (7 Zonas Lisboa) ===
$opsText

=== PROXIMOS PASSOS ===
$acoes
"@

[System.IO.File]::WriteAllText($outFile, $texto, $utf8NoBom)
Write-Host "Rascunho guardado em: $outFile" -ForegroundColor Green
notepad $outFile