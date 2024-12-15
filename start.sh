#!/bin/bash

echo "Starting the setup process..."

# Database setup
echo "Checking database..."
psql -h localhost -U postgres -p 5432 -tc "SELECT 1 FROM pg_database WHERE datname = 'notes_app'" | grep -q 1 || psql -h localhost -U postgres -p 5432 -c "CREATE DATABASE notes_app"

echo "Database setup complete."

# Backend setup
echo "Setting up the backend..."
cd backend
npm install
echo "Starting the backend server..."
npm run start &

# Frontend setup
echo "Setting up the frontend..."
cd ../frontend
npm install
echo "Starting the frontend server..."
npm run start &

echo "=== Application setup complete! Access the app at http://localhost:4200 ==="
