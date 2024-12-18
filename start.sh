#!/bin/bash

# Configuración de variables de entorno
export DB_USER="postgres"
export DB_PASSWORD="tomas3782"
export DB_NAME="notes_app"
export DB_HOST="localhost"
export DB_PORT="5432"

# Función para liberar puertos
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

# Verificar PostgreSQL
echo "🔍 Verificando instalación de PostgreSQL..."
if ! command -v psql &> /dev/null; then
  echo "🚨 PostgreSQL no está instalado. Instalándolo..."
  brew install postgresql
fi

echo "🔧 Iniciando servicio PostgreSQL..."
brew services start postgresql

# Crear usuario y base de datos si no existen
echo "🔧 Configurando usuario PostgreSQL..."
PGPASSWORD=$DB_PASSWORD psql -U postgres -h localhost -p 5432 -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';" 2>/dev/null || echo "⚠️ El usuario ya existe."
PGPASSWORD=$DB_PASSWORD psql -U postgres -h localhost -p 5432 -c "ALTER USER $DB_USER CREATEDB;"

# Eliminar base de datos anterior
echo "🔧 Eliminando base de datos existente para limpieza..."
PGPASSWORD=$DB_PASSWORD dropdb -U $DB_USER -h $DB_HOST -p $DB_PORT --if-exists $DB_NAME

# Crear base de datos limpia
echo "⚙️ Creando base de datos '$DB_NAME'..."
PGPASSWORD=$DB_PASSWORD createdb -U $DB_USER -h $DB_HOST -p $DB_PORT $DB_NAME

# Esperar unos segundos para asegurar que PostgreSQL está listo
sleep 3

# Liberar puertos 3000 y 4200
liberar_puerto 3000
liberar_puerto 4200

# Configurar backend
echo "⚙️ Configurando backend..."
cd backend
if [ ! -d "node_modules" ]; then
  npm install
fi

# Ejecutar migraciones
echo "⚙️ Ejecutando migraciones..."
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./src/data-source.ts
if [[ $? -ne 0 ]]; then
  echo "❌ Error al ejecutar migraciones. Verifica el archivo de migraciones y la conexión a la base de datos."
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
