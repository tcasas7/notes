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

# Configurar variables de entorno de la base de datos
echo "⚙️ Configurando variables de entorno de la base de datos..."
export DB_USER="postgres"
export DB_PASSWORD="tomas3782"
export DB_NAME="notes_app"
export DB_HOST="localhost"
export DB_PORT="5432"

# Verificar base de datos existente
echo "🔍 Verificando la base de datos existente..."
export PGPASSWORD=$DB_PASSWORD
DB_EXISTS=$(psql -U $DB_USER -h $DB_HOST -p $DB_PORT -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")
if [[ "$DB_EXISTS" != "1" ]]; then
    echo "❌ La base de datos '$DB_NAME' no existe. Por favor, créala manualmente."
    exit 1
else
    echo "✅ Base de datos '$DB_NAME' encontrada."
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
