# Dori Yums - Phase 2 Build Script
$ErrorActionPreference = 'Stop'
$ProjectRoot = "C:\Users\Islam\Desktop\doria macaron"

function Section($msg) {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host " $msg" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan
}

function Fail($msg) {
    Write-Host ""
    Write-Host "*** STOP: $msg" -ForegroundColor Red
    Write-Host "Copy output and send to Claude." -ForegroundColor Yellow
    exit 1
}

Set-Location $ProjectRoot

Section "STEP 1 - Environment verification"

$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCmd) { Fail "node not found on PATH" }
$nodeV = node --version

$javaCmd = Get-Command java -ErrorAction SilentlyContinue
if (-not $javaCmd) { Fail "java not found on PATH" }
$javaV = (cmd /c "java -version 2>&1" | Select-Object -First 1)

$adbCmd = Get-Command adb -ErrorAction SilentlyContinue
if (-not $adbCmd) { Fail "adb not found on PATH" }
$adbV = adb --version | Select-Object -First 1

Write-Host "node:         $nodeV"
Write-Host "java:         $javaV"
Write-Host "adb:          $adbV"
Write-Host "ANDROID_HOME: $env:ANDROID_HOME"
Write-Host "JAVA_HOME:    $env:JAVA_HOME"

if (-not $env:ANDROID_HOME -or -not (Test-Path $env:ANDROID_HOME)) {
    Fail "ANDROID_HOME is not set or path does not exist"
}

if (-not $env:JAVA_HOME) {
    $likelyJdk = "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot"
    if (Test-Path $likelyJdk) {
        $env:JAVA_HOME = $likelyJdk
        Write-Host "JAVA_HOME set to $likelyJdk for this session." -ForegroundColor Yellow
    } else {
        Fail "JAVA_HOME not set and could not auto-detect JDK 17"
    }
}

Section "STEP 2 - package.json check"
if (-not (Test-Path "package.json")) { Fail "package.json missing" }
Write-Host "package.json OK"

Section "STEP 3 - npm install Capacitor"
npm install --save "@capacitor/core" "@capacitor/cli" "@capacitor/android" "@capacitor/app" "@capacitor/splash-screen" "@capacitor/status-bar" "@capacitor/preferences"
if ($LASTEXITCODE -ne 0) { Fail "npm install failed" }

Section "STEP 4 - npm install dev dependencies"
npm install --save-dev "@capacitor/assets"
if ($LASTEXITCODE -ne 0) { Fail "npm install dev failed" }

Section "STEP 5 - Generate Capacitor assets"
if (Test-Path "assets/icon-only.png") {
    npx capacitor-assets generate --android
    if ($LASTEXITCODE -ne 0) { Fail "asset generation failed" }
} else {
    Write-Host "assets folder missing - skipping" -ForegroundColor Yellow
}

Section "STEP 6 - Add Android platform"
if (-not (Test-Path "android")) {
    npx cap add android
    if ($LASTEXITCODE -ne 0) { Fail "cap add android failed" }
} else {
    Write-Host "android folder already exists" -ForegroundColor Yellow
}

Section "STEP 7 - Sync"
npx cap sync android
if ($LASTEXITCODE -ne 0) { Fail "cap sync failed" }

Section "STEP 8 - Build debug APK (this takes 5-10 min on first run)"
Set-Location "$ProjectRoot\android"
.\gradlew.bat assembleDebug
if ($LASTEXITCODE -ne 0) { Fail "gradle build failed" }

Section "STEP 9 - Verify APK"
$apkPath = "$ProjectRoot\android\app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $apkPath) {
    $sizeMB = [math]::Round((Get-Item $apkPath).Length / 1MB, 2)
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host " SUCCESS! APK ready:" -ForegroundColor Green
    Write-Host " $apkPath" -ForegroundColor Green
    Write-Host " Size: $sizeMB MB" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
} else {
    Fail "APK not found at expected location"
}
