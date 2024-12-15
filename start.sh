#!/bin/bash

# Configuración de variables de entorno
export DB_USER="postgres"
export DB_PASSWORD="tomas3782"
export DB_NAME="notes_app"
export DB_HOST="localhost"
export DB_PORT="5432"

# Verificar PostgreSQL
echo "🔍 Verificando instalación de PostgreSQL..."
if ! command -v psql &> /dev/null; then
  echo "🚨 PostgreSQL no está instalado. Instalándolo..."
  brew install postgresql
  brew services start postgresql
else
  echo "✅ PostgreSQL está instalado."
fi

# Verificar conexión a PostgreSQL
echo "🔗 Verificando conexión a PostgreSQL..."
PG_CONNECTION=$(psql -U $DB_USER -h $DB_HOST -p $DB_PORT -c "SELECT version();" 2>&1)
if [[ $? -ne 0 ]]; then
  echo "❌ No se pudo conectar a PostgreSQL: $PG_CONNECTION"
  exit 1
else
  echo "✅ Conexión a PostgreSQL establecida."
fi

# Crear base de datos si no existe
echo "🔍 Verificando la existencia de la base de datos '$DB_NAME'..."
DB_EXISTS=$(psql -U $DB_USER -h $DB_HOST -p $DB_PORT -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME';" 2>&1)
if [[ "$DB_EXISTS" != "1" ]]; then
  echo "⚙️ Creando la base de datos '$DB_NAME'..."
  createdb -U $DB_USER -h $DB_HOST -p $DB_PORT $DB_NAME
  echo "✅ Base de datos '$DB_NAME' creada exitosamente."
else
  echo "✅ La base de datos '$DB_NAME' ya existe."
fi

# Configurar backend
echo "⚙️ Configurando backend..."
cd backend
if [ ! -d "node_modules" ]; then
  npm install
fi
npx typeorm migration:run --dataSource src/data-source.ts
npm start &
cd ..

# Configurar frontend
echo "⚙️ Configurando frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
  npm install
fi

# Desactivar el prompt de analíticas de Angular CLI
npx ng analytics off

# Iniciar el frontend
npx ng serve --host 0.0.0.0 --port 4200 &
cd ..

echo "🚀 Aplicación iniciada exitosamente."
echo "Accede a la app en: http://localhost:4200"
