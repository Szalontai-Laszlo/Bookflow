@echo off
chcp 65001 >nul

echo Angular és Express szerver indítása egy ablakban...

REM --- Angular szerver indítása háttérben, sárga színnel ---
cd html
start /b powershell -command "npx ng serve 2>&1 | ForEach-Object { Write-Host '[ANGULAR]: ' -ForegroundColor Yellow -NoNewline; Write-Host $_ }"
cd ..

REM --- Express szerver indítása háttérben, zöld színnel ---
cd html\server
start /b powershell -command "node server.js 2>&1 | ForEach-Object { Write-Host '[EXPRESS]: ' -ForegroundColor Green -NoNewline; Write-Host $_ }"
cd ..\..


timeout /t 5 /nobreak > nul
echo.
echo ================================
echo Angular fut: http://localhost:4200
echo Express fut: http://localhost:3000
echo ================================
echo.

echo A szerverek futnak. Az ablak nyitva marad.
pause
