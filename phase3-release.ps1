# ============================================================
# Dori Yums - Phase 3: Generate keystore + build SIGNED Release AAB
# Run ONCE in PowerShell:
#   cd "C:\Users\Islam\Desktop\doria macaron"
#   Set-ExecutionPolicy -Scope Process Bypass
#   .\phase3-release.ps1
# After first run, the keystore exists - re-runs just rebuild the AAB.
# ============================================================

$ErrorActionPreference = 'Stop'
$ProjectRoot   = "C:\Users\Islam\Desktop\doria macaron"
$KeystorePath  = "$ProjectRoot\dori-yums-release.keystore"
$KeyPropsPath  = "$ProjectRoot\android\key.properties"
$CredsBackup   = "$ProjectRoot\KEYSTORE_BACKUP.txt"

# Owner / certificate identity
# (Halouane Doria Khadidja - Dori_Yums - Rouiba, Alger, DZ)
$DN = "CN=Halouane Doria Khadidja, OU=Mobile Apps, O=Dori_Yums, L=Rouiba, ST=Alger, C=DZ"
$Alias = "dori-yums"
# 32-char strong password generated for you (write down + back up before first run)
$Password = "34WiLIAtAmEK3r9PefJ34oIsNs8IKenP"

function Section($msg) {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host " $msg" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan
}
function Fail($msg) {
    Write-Host ""
    Write-Host "*** STOP: $msg" -ForegroundColor Red
    exit 1
}

Set-Location $ProjectRoot

# Need JAVA_HOME for keytool
if (-not $env:JAVA_HOME) {
    $likely = "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot"
    if (Test-Path $likely) {
        $env:JAVA_HOME = $likely
    } else {
        Fail "JAVA_HOME not set - install JDK 17 or set JAVA_HOME"
    }
}
$keytool = Join-Path $env:JAVA_HOME "bin\keytool.exe"
if (-not (Test-Path $keytool)) { Fail "keytool.exe not found in $env:JAVA_HOME\bin" }

# ----------------------------------------------------------------
# STEP 1 - Generate keystore (if not exists)
# ----------------------------------------------------------------
Section "STEP 1 - Generate signing keystore"

if (Test-Path $KeystorePath) {
    Write-Host "Keystore already exists at $KeystorePath - skipping generation." -ForegroundColor Yellow
} else {
    Write-Host "Creating keystore..."
    & $keytool -genkeypair -v `
        -keystore "$KeystorePath" `
        -alias "$Alias" `
        -keyalg RSA -keysize 2048 -validity 10000 `
        -storepass "$Password" -keypass "$Password" `
        -dname "$DN"
    if ($LASTEXITCODE -ne 0) { Fail "keytool failed to create keystore" }
    Write-Host "OK - Keystore created: $KeystorePath" -ForegroundColor Green

    # Save a human-readable backup of the credentials
    $backupLines = @(
        "================================================================",
        "  DORI YUMS - KEYSTORE BACKUP",
        "  CREATED: $(Get-Date -Format 'yyyy-MM-dd HH:mm')",
        "  THIS FILE IS CRITICAL - back it up to USB + cloud immediately.",
        "  WITHOUT IT YOU CANNOT UPDATE THE APP ON PLAY STORE.",
        "================================================================",
        "",
        "Keystore file: $KeystorePath",
        "Alias:         $Alias",
        "Password:      $Password",
        "Key password:  $Password    (same as store password)",
        "",
        "Certificate identity (owner info):",
        "  $DN",
        "",
        "App package:   com.azikstudio.doriyums",
        "App name:      Dori Yums",
        "",
        "================================================================",
        "  BACKUP CHECKLIST  (do all three):",
        "    1. Copy 'dori-yums-release.keystore' to a USB drive",
        "    2. Upload 'dori-yums-release.keystore' to Google Drive / OneDrive",
        "    3. Save this password in a password manager (Bitwarden / 1Password)",
        "  DELETE THIS FILE after you finish backing up - it has the password.",
        "================================================================"
    )
    $backupLines | Out-File -FilePath $CredsBackup -Encoding UTF8
    Write-Host ""
    Write-Host "Credentials backup written to:" -ForegroundColor Yellow
    Write-Host "   $CredsBackup" -ForegroundColor Yellow
    Write-Host "   WARNING: Back up the keystore + password NOW, then delete this file." -ForegroundColor Yellow
}

# ----------------------------------------------------------------
# STEP 2 - Write key.properties for Gradle
# ----------------------------------------------------------------
Section "STEP 2 - Write android/key.properties"

$keyPropsLines = @(
    "storePassword=$Password",
    "keyPassword=$Password",
    "keyAlias=$Alias",
    "storeFile=../dori-yums-release.keystore"
)
$keyPropsLines | Out-File -FilePath $KeyPropsPath -Encoding ASCII
Write-Host "OK - Wrote $KeyPropsPath"

# ----------------------------------------------------------------
# STEP 3 - Sync latest web files into android
# ----------------------------------------------------------------
Section "STEP 3 - npx cap sync android"
npx cap sync android
if ($LASTEXITCODE -ne 0) { Fail "cap sync failed" }

# ----------------------------------------------------------------
# STEP 4 - Build SIGNED Release AAB + APK
# ----------------------------------------------------------------
Section "STEP 4 - gradlew bundleRelease + assembleRelease (5-10 min first run)"
Push-Location "$ProjectRoot\android"
try {
    .\gradlew.bat clean bundleRelease assembleRelease
    if ($LASTEXITCODE -ne 0) {
        Pop-Location
        Fail "gradle release build failed - see error above"
    }
} finally {
    if ((Get-Location).Path -eq "$ProjectRoot\android") { Pop-Location }
}

# ----------------------------------------------------------------
# STEP 5 - Locate outputs + summary
# ----------------------------------------------------------------
Section "STEP 5 - Build outputs"
$aabPath = "$ProjectRoot\android\app\build\outputs\bundle\release\app-release.aab"
$apkPath = "$ProjectRoot\android\app\build\outputs\apk\release\app-release.apk"

Write-Host ""
if (Test-Path $aabPath) {
    $sz = [math]::Round((Get-Item $aabPath).Length / 1MB, 2)
    Write-Host "OK - AAB (upload this to Google Play Store):" -ForegroundColor Green
    Write-Host "   $aabPath" -ForegroundColor Green
    Write-Host "   Size: $sz MB" -ForegroundColor Green
} else {
    Write-Host "ERROR - AAB not found at expected location" -ForegroundColor Red
}
Write-Host ""
if (Test-Path $apkPath) {
    $sz = [math]::Round((Get-Item $apkPath).Length / 1MB, 2)
    Write-Host "OK - APK (share directly with friends or sideload):" -ForegroundColor Green
    Write-Host "   $apkPath" -ForegroundColor Green
    Write-Host "   Size: $sz MB" -ForegroundColor Green
} else {
    Write-Host "ERROR - APK not found at expected location" -ForegroundColor Red
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " NEXT STEPS:" -ForegroundColor Cyan
Write-Host " 1. Back up the keystore file + password (see KEYSTORE_BACKUP.txt)" -ForegroundColor Cyan
Write-Host " 2. Install the Release APK on your phone to test:" -ForegroundColor Cyan
Write-Host "    adb install -r `"$apkPath`"" -ForegroundColor Cyan
Write-Host " 3. Upload the AAB to Google Play Console when account is ready." -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
