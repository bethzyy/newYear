@echo off
cls

echo ========================================================================
echo           Horse Year Red Packet - Quick Start Guide
echo ========================================================================
echo.

echo Location: %cd%
echo.

echo [OK] All resources are ready!
echo.

echo Project Files Check:
if exist "app.json" (
    echo     [OK] app.json
)

if exist "pages\index\index.js" (
    echo     [OK] pages\index\index.js
)

if exist "images\horse.svg" (
    echo     [OK] images\horse.svg
)

if exist "images\lantern.svg" (
    echo     [OK] images\lantern.svg
)

if exist "使用指南.md" (
    echo     [OK] User Guide
)

echo.
echo ========================================================================
echo  Next Step: Download WeChat Developer Tools
echo ========================================================================
echo.

echo 1. Open browser and visit:
echo.
echo    https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
echo.

echo 2. Download for your system:
echo    - Windows: Click "Windows" button
echo    - macOS: Click "Mac" button
echo.

echo 3. Install the downloaded file
echo.

echo ========================================================================
echo  After Installation:
echo ========================================================================
echo.

echo 1. Open WeChat Developer Tools
echo 2. Select "Mini Program"
echo 3. Click "+" to import project
echo 4. Select this folder: %cd%
echo 5. AppID: Select "Test Account" (if not registered)
echo 6. Click "Import"
echo 7. Click "Compile" to see the effect
echo 8. Click the red packet to start animation!
echo.

echo ========================================================================
echo.
echo Press any key to open download page...
pause >nul

start https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

echo.
echo Download page opened in browser
echo.
echo Check "使用指南.md" for detailed tutorial
echo.

pause
