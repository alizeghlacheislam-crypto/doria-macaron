# ================================================================
# Dori Yums - AUTO-DEPLOY WATCHER
# Run once in PowerShell:
#   cd "C:\Users\Islam\Desktop\doria macaron"
#   .\watch.ps1
# Leave the window OPEN. Edit any .html / .css / .js / .json file
# and SAVE - after 30 seconds of inactivity, deploy runs automatically.
# Press Ctrl+C to stop the watcher.
# ================================================================

param(
    [int]$DebounceSeconds = 30,    # wait this long after last edit before deploying
    [switch]$NoBuild,               # web-only deploys (faster, no APK rebuild)
    [switch]$SkipFirstWait          # deploy immediately on start (test mode)
)

$ProjectRoot = "C:\Users\Islam\Desktop\doria macaron"
Set-Location $ProjectRoot

# Files we care about (changes to these trigger deploy)
$Patterns = @('*.html','*.js','*.css','*.json','*.webmanifest')
# Folders to ignore (no point watching build outputs)
$IgnoreDirs = @('android','node_modules','.git','.gradle','.idea')

# State
$Global:LastChange = $null
$Global:Pending = $false
$Global:Deploying = $false

function Section($msg) {
    Write-Host ""
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host " $msg" -ForegroundColor Cyan
    Write-Host "================================================================" -ForegroundColor Cyan
}

function ShouldIgnore($fullPath) {
    foreach ($d in $IgnoreDirs) {
        if ($fullPath -like "*\$d\*") { return $true }
    }
    return $false
}

function TriggerDeploy {
    if ($Global:Deploying) {
        Write-Host "  [skip] deploy already in progress" -ForegroundColor Yellow
        return
    }
    $Global:Deploying = $true
    Section "AUTO-DEPLOY TRIGGERED at $(Get-Date -Format 'HH:mm:ss')"
    try {
        $args = @('-Quick')
        if ($NoBuild) { $args += '-SkipBuild' }
        & (Join-Path $ProjectRoot 'deploy.ps1') @args
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "  +++ DEPLOYED at $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Green
        } else {
            Write-Host ""
            Write-Host "  XXX DEPLOY FAILED" -ForegroundColor Red
        }
    } catch {
        Write-Host "  XXX EXCEPTION: $_" -ForegroundColor Red
    } finally {
        $Global:Deploying = $false
        $Global:Pending = $false
        $Global:LastChange = $null
        Write-Host ""
        Write-Host "Watching again. Edit any file to trigger next deploy." -ForegroundColor Gray
    }
}

# Set up FileSystemWatcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $ProjectRoot
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]'FileName,LastWrite,Size'

$onChange = {
    $path = $Event.SourceEventArgs.FullPath
    if (ShouldIgnore $path) { return }
    $ext = [System.IO.Path]::GetExtension($path).ToLower()
    if ($ext -notin '.html','.htm','.js','.css','.json','.webmanifest') { return }
    $name = [System.IO.Path]::GetFileName($path)
    Write-Host "  [edit] $name $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor DarkGray
    $Global:LastChange = Get-Date
    $Global:Pending = $true
}

$subs = @()
$subs += Register-ObjectEvent $watcher 'Changed' -Action $onChange
$subs += Register-ObjectEvent $watcher 'Created' -Action $onChange
$subs += Register-ObjectEvent $watcher 'Renamed' -Action $onChange

# Banner
Clear-Host
Section "Dori Yums - Auto-deploy watcher"
Write-Host "  Watching: $ProjectRoot" -ForegroundColor Gray
Write-Host "  Triggers: $($Patterns -join ', ')" -ForegroundColor Gray
Write-Host "  Ignoring: $($IgnoreDirs -join ', ')" -ForegroundColor Gray
Write-Host "  Debounce: $DebounceSeconds seconds (waits for you to finish editing)" -ForegroundColor Gray
if ($NoBuild) { Write-Host "  Mode    : WEB ONLY (no APK rebuild)" -ForegroundColor Yellow }
Write-Host ""
Write-Host "  Edit any file -> save -> wait $DebounceSeconds sec -> auto-deploy" -ForegroundColor Green
Write-Host "  Press Ctrl+C to stop" -ForegroundColor DarkGray
Write-Host ""

if ($SkipFirstWait) { TriggerDeploy }

# Main loop: check every 2 sec if pending changes have settled
try {
    while ($true) {
        Start-Sleep -Seconds 2
        if ($Global:Pending -and $Global:LastChange) {
            $elapsed = ((Get-Date) - $Global:LastChange).TotalSeconds
            if ($elapsed -ge $DebounceSeconds) {
                TriggerDeploy
            } else {
                $remaining = [int]($DebounceSeconds - $elapsed)
                Write-Host "`r  [pending] deploy in $remaining sec... (edit to reset)" -NoNewline -ForegroundColor Yellow
            }
        }
    }
} finally {
    foreach ($s in $subs) { Unregister-Event -SourceIdentifier $s.Name -ErrorAction SilentlyContinue }
    $watcher.Dispose()
    Write-Host ""
    Write-Host "Watcher stopped." -ForegroundColor Yellow
}
