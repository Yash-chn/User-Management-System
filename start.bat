@echo off
title User Management System Launcher
echo ===================================================
echo Starting Growth Tech India - User Management System
echo ===================================================
echo [1/2] Starting Node.js Backend Server on http://localhost:5000 ...
start "UMS - Backend Server (Port 5000)" cmd /k "cd /d %~dp0backend && npm run dev"
timeout /t 2 /nobreak >nul
echo [2/2] Starting React Vite Frontend on http://localhost:5173 ...
start "UMS - Frontend (Vite)" cmd /k "cd /d %~dp0frontend && npm run dev"
echo ===================================================
echo Both Backend and Frontend are starting!
echo Open your browser at: http://localhost:5173
echo ===================================================
