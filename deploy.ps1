param(
  [string]$Message = "",
  [string]$Branch = "",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repoRoot

if (-not (Test-Path ".git")) {
  throw "Not a git repository: $repoRoot"
}

if ([string]::IsNullOrWhiteSpace($Branch)) {
  $Branch = (& git rev-parse --abbrev-ref HEAD).Trim()
}

if ($DryRun) {
  Write-Host "[DryRun] Repository:" $repoRoot
  Write-Host "[DryRun] Branch:" $Branch
  & git status -sb
  exit 0
}

Write-Host "Syncing with origin/$Branch..."
& git fetch origin $Branch
$behindCountRaw = (& git rev-list --count "HEAD..origin/$Branch").Trim()
$behindCount = 0
[void][int]::TryParse($behindCountRaw, [ref]$behindCount)

if ($behindCount -gt 0) {
  Write-Host "Local branch is behind by $behindCount commit(s), rebasing..."
  & git pull --rebase --autostash origin $Branch
}

& git add -A

$stagedFiles = (& git diff --cached --name-only).Trim()
if ([string]::IsNullOrWhiteSpace($stagedFiles)) {
  Write-Host "No staged changes. Nothing to upload."
  exit 0
}

if ([string]::IsNullOrWhiteSpace($Message)) {
  $Message = "site update " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
}

Write-Host "Committing..."
& git commit -m $Message

Write-Host "Pushing to origin/$Branch..."
& git push origin $Branch

Write-Host "Done."
