#!/usr/bin/env bash
set -e

if [ ! -d "node_modules" ]; then
  echo "node_modules no existe. Instalando dependencias..."
  npm install
else
  echo "Dependencias detectadas. Iniciando servidor..."
fi

npm start
