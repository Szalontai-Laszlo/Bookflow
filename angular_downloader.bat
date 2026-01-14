@echo off
echo Angular telepítése...

REM --- Angular szerver indítása háttérben, sárga színnel ---
cd html
start /b powershell -command "npm install 2>&1 | ForEach-Object { Write-Host '[ANGULAR]: ' -ForegroundColor Yellow -NoNewline; Write-Host $_ }"
cd ..

echo Angular sikeresen telepítve!