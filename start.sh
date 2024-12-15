#!/bin/bash

# Comprobación de permisos
echo "🔍 Verificando permisos..."
sudo chown -R $(whoami) ~/.npm &> /dev/null
echo "✅ Permisos de npm reparados."

# Verificar e instalar PostgreSQL
if ! command -v psql &> /dev/null; then
  echo "🚨 PostgreSQL no está instalado. Instalando PostgreSQL..."
  brew install postgresql
  brew services start postgresql
else
  echo "✅ PostgreSQL encontrado."
fi

# Verificar Node.js y npm
if ! command -v node &> /dev/null; then
  echo "🚨 Node.js no está instalado. Por favor instálalo y vuelve a intentarlo."
  exit 1
fi
if ! command -v npm &> /dev/null; then
  echo "🚨 npm no está instalado. Por favor instálalo y vuelve a intentarlo."
  exit 1
fi
echo "✅ Node.js y npm encontrados."

# Instalar NestJS CLI si no está presente
if ! command -v nest &> /dev/null; then
  echo "🚨 NestJS CLI no encontrado. Instalando NestJS CLI..."
  npm install -g @nestjs/cli
else
  echo "✅ NestJS CLI encontrado."
fi

# Instalar Angular CLI si no está presente
if ! command -v ng &> /dev/null; then
  echo "🚨 Angular CLI no encontrado. Instalando Angular CLI..."
  npm install -g @angular/cli
else
  echo "✅ Angular CLI encontrado."
fi

# Configurar backend
echo "⚙️ Configurando backend..."
cd backend
if [ ! -d "node_modules" ]; then
  npm install
fi
npm start &
cd ..

# Configurar frontend
echo "⚙️ Configurando frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
  npm install
fi
npm start &
cd ..

echo "🚀 Aplicación iniciada exitosamente."
echo "Accede a la app en: http://localhost:4200"
