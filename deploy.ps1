# ================================================================
# Dori Yums - One-command DEPLOY AGENT
# Run after you edit any code:
#   .\deploy.ps1
# What it does (in order):
#   1. Auto-bumps versionCode + versionName
#   2. Asks for release notes (AR/FR/EN)
#   3. Syncs APP_VERSION_CODE in all 3 HTML files
#   4. Mirrors root files to www/ (so APK gets latest code)
#   5. Updates version.json on server
#   6. Builds signed Release APK
#   7. Copies APK to root for the download page
#   8. Commits + pushes to GitHub -> Cloudflare auto-deploys
#   9. Optionally installs on your phone (if -InstallOnPhone)
# ================================================================

param(
    [switch]$InstallOnPhone,   # also adb install -r after build
    [switch]$SkipBuild,         # only push web changes (no APK rebuild)
    [switch]$NoPush,            # build but don't git push
    [switch]$Quick              # skip notes prompt - just bump and ship
)

$ErrorActionPreference = 'Stop'
$ProjectRoot = "C:\Users\Islam\Desktop\doria macaron"
$VersionFile = "$ProjectRoot\version.json"

Set-Location $ProjectRoot

function Section($msg) {
    Write-Host ""
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host " $msg" -ForegroundColor Cyan
    Write-Host "================================================================" -ForegroundColor Cyan
}
function Info($msg) { Write-Host "  $msg" -ForegroundColor Gray }
function OK($msg)   { Write-Host "  OK  $msg" -ForegroundColor Green }
function Warn($msg) { Write-Host "  !   $msg" -ForegroundColor Yellow }
function Fail($msg) {
    Write-Host ""
    Write-Host "*** STOP: $msg" -ForegroundColor Red
    exit 1
}

# Need JAVA_HOME
if (-not $env:JAVA_HOME) {
    $likely = "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot"
    if (Test-Path $likely) { $env:JAVA_HOME = $likely }
}

# ----------------------------------------------------------------
# STEP 1 - Read current version, bump it
# ----------------------------------------------------------------
Section "STEP 1 - Version bump"

if (-not (Test-Path $VersionFile)) { Fail "version.json not found - create it first" }
$ver = Get-Content $VersionFile -Raw | ConvertFrom-Json
$oldCode = [int]$ver.versionCode
$oldName = $ver.versionName
$newCode = $oldCode + 1

# Bump patch number: 1.0.1 -> 1.0.2
$parts = $oldName -split '\.'
if ($parts.Count -lt 3) { $parts = @('1','0','0') }
$parts[2] = [string]([int]$parts[2] + 1)
$newName = $parts -join '.'

Info "Current: versionCode=$oldCode  versionName=$oldName"
Info "New    : versionCode=$newCode  versionName=$newName"

# ----------------------------------------------------------------
# STEP 2 - Release notes
# ----------------------------------------------------------------
$notesAR = ""
$notesFR = ""
$notesEN = ""

if ($Quick) {
    # Build Arabic from Unicode escapes to avoid PowerShell encoding issues
    $notesAR = [char]0x062A + [char]0x062D + [char]0x062F + [char]0x064A + [char]0x062B + [char]0x0020 + [char]0x0648 + [char]0x062A + [char]0x062D + [char]0x0633 + [char]0x064A + [char]0x0646 + [char]0x0627 + [char]0x062A
    $notesFR = "Mises a jour et ameliorations"
    $notesEN = "Updates and improvements"
    Info "Quick mode: using default notes"
} else {
    Section "STEP 2 - Release notes (press Enter to skip a language)"
    Write-Host "  Tip: use \n for new lines in notes" -ForegroundColor DarkGray
    Write-Host ""
    $notesAR = Read-Host "  AR notes"
    if (-not $notesAR) { $notesAR = "تحديث وتحسينات" }
    $notesFR = Read-Host "  FR notes"
    if (-not $notesFR) { $notesFR = $notesAR }
    $notesEN = Read-Host "  EN notes"
    if (-not $notesEN) { $notesEN = $notesAR }
}

# ----------------------------------------------------------------
# STEP 3 - Write new version.json
# ----------------------------------------------------------------
Section "STEP 3 - Update version.json"

$today = Get-Date -Format "yyyy-MM-dd"
$newVer = [ordered]@{
    versionCode  = $newCode
    versionName  = $newName
    released     = $today
    downloadUrl  = "https://doria-macaron.pages.dev/download.html"
    directApkUrl = "https://doria-macaron.pages.dev/dori-yums.apk"
    mandatory    = $false
    notes        = [ordered]@{
        ar = $notesAR
        fr = $notesFR
        en = $notesEN
    }
}
# Write as UTF-8 WITHOUT BOM (PowerShell's Set-Content -Encoding UTF8 adds BOM which breaks strict JSON parsers)
$jsonText = ($newVer | ConvertTo-Json -Depth 5)
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($VersionFile, $jsonText, $utf8NoBom)
OK "version.json -> versionCode=$newCode"

# ----------------------------------------------------------------
# STEP 4 - Sync APP_VERSION_CODE in HTML files
# ----------------------------------------------------------------
Section "STEP 4 - Sync APP_VERSION_CODE in HTML"

$htmlFiles = @(
    "$ProjectRoot\index.html",
    "$ProjectRoot\www\index.html",
    "$ProjectRoot\Dori Yums.html"
)
$pattern = "var APP_VERSION_CODE = \d+;"
$replace = "var APP_VERSION_CODE = $newCode;"

$utf8NoBomEnc = New-Object System.Text.UTF8Encoding $false
foreach ($f in $htmlFiles) {
    if (-not (Test-Path $f)) { Warn "Missing: $f - skipping"; continue }
    # CRITICAL: read with explicit UTF-8 - otherwise Windows-1252 default corrupts Arabic
    $content = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
    if ($content -notmatch $pattern) {
        Warn "$([System.IO.Path]::GetFileName($f)): no APP_VERSION_CODE line found - skipping"
        continue
    }
    $newContent = $content -replace $pattern, $replace
    # Write back as UTF-8 without BOM (browsers/PowerShell-strict-mode prefer no-BOM)
    [System.IO.File]::WriteAllText($f, $newContent, $utf8NoBomEnc)
    OK "Synced $([System.IO.Path]::GetFileName($f))"
}

# ----------------------------------------------------------------
# STEP 5 - Mirror root files to www/ (so APK gets latest code)
# ----------------------------------------------------------------
Section "STEP 5 - Mirror code to www/"

$mirrorFiles = @(
    "index.html",
    "image-slot.js",
    "app.js",
    "features.js",
    "extras.js",
    "promo.js",
    "features.css",
    "extras.css",
    "promo.css",
    "sw.js",
    "manifest.webmanifest",
    "logo.webp",
    "logo.png",
    "offline.html"
)
foreach ($f in $mirrorFiles) {
    $src = "$ProjectRoot\$f"
    $dst = "$ProjectRoot\www\$f"
    if (Test-Path $src) {
        Copy-Item $src $dst -Force
    }
}
OK "Mirrored $(($mirrorFiles | Where-Object { Test-Path "$ProjectRoot\$_" }).Count) files"

# Also mirror images/ folder
if (Test-Path "$ProjectRoot\images") {
    Copy-Item "$ProjectRoot\images\*" "$ProjectRoot\www\images\" -Recurse -Force
    OK "Mirrored images/"
}

# ----------------------------------------------------------------
# STEP 6 - Build signed Release APK
# ----------------------------------------------------------------
if ($SkipBuild) {
    Section "STEP 6 - Build SKIPPED (-SkipBuild flag)"
    Warn "Web will update but APK download will be the old version"
} else {
    Section "STEP 6 - Build signed Release APK"
    Info "npx cap sync android..."
    npx cap sync android 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) { Fail "cap sync failed" }
    OK "cap sync done"

    Info "Building APK (1-3 min)..."
    Push-Location "$ProjectRoot\android"
    try {
        .\gradlew.bat --quiet bundleRelease assembleRelease
        if ($LASTEXITCODE -ne 0) { Pop-Location; Fail "gradle build failed" }
    } finally {
        if ((Get-Location).Path -eq "$ProjectRoot\android") { Pop-Location }
    }
    OK "APK built"

    # Copy to root
    $newApk = "$ProjectRoot\android\app\build\outputs\apk\release\app-release.apk"
    Copy-Item $newApk "$ProjectRoot\dori-yums.apk" -Force
    $apkSize = [math]::Round((Get-Item "$ProjectRoot\dori-yums.apk").Length / 1MB, 2)
    OK "Copied dori-yums.apk ($apkSize MB) to project root"
}

# ----------------------------------------------------------------
# STEP 7 - git commit + push
# ----------------------------------------------------------------
if ($NoPush) {
    Section "STEP 7 - Git push SKIPPED (-NoPush flag)"
    Warn "Run 'git add -A && git commit -m ... && git push' manually when ready"
} else {
    Section "STEP 7 - Push to Cloudflare"

    $changes = git status --porcelain
    if (-not $changes) {
        Warn "No changes to commit - nothing to push"
    } else {
        $msg = "v$newName : $notesAR"
        if ($msg.Length -gt 72) { $msg = $msg.Substring(0,69) + "..." }
        git add -A | Out-Null
        git commit -m "$msg" | Out-Null
        if ($LASTEXITCODE -ne 0) { Fail "git commit failed" }
        OK "Committed: $msg"

        Info "Pushing to origin..."
        # git writes progress to stderr; temporarily relax error handling
        $prevPref = $ErrorActionPreference
        $ErrorActionPreference = 'Continue'
        $pushOut = & git push 2>&1
        $pushCode = $LASTEXITCODE
        $ErrorActionPreference = $prevPref
        if ($pushCode -ne 0) {
            Write-Host ($pushOut -join "`n") -ForegroundColor Red
            Fail "git push failed - check your internet"
        }
        OK "Pushed - Cloudflare will deploy in ~30 seconds"
    }
}

# ----------------------------------------------------------------
# STEP 8 - Optional install on phone
# ----------------------------------------------------------------
if ($InstallOnPhone -and -not $SkipBuild) {
    Section "STEP 8 - Install on connected phone"
    $apkPath = "$ProjectRoot\android\app\build\outputs\apk\release\app-release.apk"
    Info "adb install -r $apkPath"
    adb install -r "$apkPath"
    if ($LASTEXITCODE -ne 0) {
        Warn "Install failed - if 'INSTALL_FAILED_UPDATE_INCOMPATIBLE', run:"
        Warn "  adb shell pm uninstall com.azikstudio.doriyums"
        Warn "  adb install $apkPath"
    } else {
        OK "Installed on phone"
    }
}

# ----------------------------------------------------------------
# DONE
# ----------------------------------------------------------------
Write-Host ""
Write-Host "================================================================" -ForegroundColor Green
Write-Host " DEPLOY DONE - v$newName (code $newCode) is live" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Web:      https://doria-macaron.pages.dev" -ForegroundColor White
Write-Host "  Download: https://doria-macaron.pages.dev/download.html" -ForegroundColor White
Write-Host "  APK:      https://doria-macaron.pages.dev/dori-yums.apk" -ForegroundColor White
Write-Host ""
Write-Host "  Existing app users will see 'update available' within 24h." -ForegroundColor Gray
Write-Host ""
