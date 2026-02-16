@echo off
REM LinguaAI PWA - Script de Servidor Local para Windows

echo.
echo ========================================
echo   LinguaAI - Servidor Local PWA
echo ========================================
echo.

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Node.js nao encontrado!
    echo.
    echo Instale Node.js: https://nodejs.org/
    echo.
    echo Ou use Python:
    echo    python -m http.server 8080
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js encontrado
node --version
echo.

echo Iniciando servidor...
echo.

node server.js

pause
