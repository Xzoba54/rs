@echo off
start "code" cmd /k "code ."
start "client" cmd /k "cd client & npm start"
start "server" cmd /k "cd server & npm run dev"