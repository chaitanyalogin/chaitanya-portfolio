@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is needed. Install Node.js 22 or newer, then open this file again.
  pause
  exit /b 1
)
set PORTFOLIO_OPEN_BROWSER=1
echo Opening your portfolio. Keep this window open while using it.
node scripts/serve-static.mjs
pause
