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

# Liberar puertos si están en uso
function liberar_puerto() {
  PORT=$1
  echo "🔍 Verificando si el puerto $PORT está en uso..."
  if lsof -ti:$PORT &> /dev/null; then
    echo "⚠️ El puerto $PORT está en uso. Matando el proceso..."
    lsof -ti:$PORT | xargs kill -9
    echo "✅ Puerto $PORT liberado."
  else
    echo "✅ El puerto $PORT está libre."
  fi
}

# Liberar puertos 3000 y 4200
liberar_puerto 3000
liberar_puerto 4200

# Configurar backend
echo "⚙️ Configurando backend..."
cd backend
if [ ! -d "node_modules" ]; then
  npm install
fi

# Ejecutar migraciones usando ts-node
echo "⚙️ Ejecutando migraciones..."
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./src/data-source.ts
if [[ $? -ne 0 ]]; then
  echo "❌ Error al ejecutar migraciones."
  exit 1
fi
echo "✅ Migraciones ejecutadas correctamente."

# Iniciar backend
echo "🚀 Iniciando backend..."
npm start &
cd ..

# Configurar frontend
echo "⚙️ Configurando frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
  npm install
fi

# Desactivar el prompt de analíticas de Angular CLI
echo "🔧 Desactivando analíticas de Angular CLI..."
npx ng analytics off

# Iniciar el frontend
echo "🚀 Iniciando frontend..."
npx ng serve --host 0.0.0.0 --port 4200 &
cd ..

echo "✅ Aplicación iniciada exitosamente."
echo "Accede a la app en: http://localhost:4200"
