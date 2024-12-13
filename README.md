# Notes Application

## Description
This is a web application for note-taking that allows users to:
- Create, edit, and delete notes.
- Archive and unarchive notes.
- Assign tags to notes and filter them by categories (Phase 2).

The application follows an SPA (Single Page Application) architecture with a separate backend and a relational database.

---

## Technologies Used

### Backend
- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM

### Frontend
- **Framework:** Angular (to be implemented in Phase 2).

---

## Prerequisites
Before running the application, ensure you have the following installed:
- **Node.js**: v18.17 or higher
- **npm**: v8.15 or higher
- **PostgreSQL**: v16.6 or higher

---

## Project Setup

### Backend
1. **Install dependencies:**
   ```bash
   cd backend
   npm install

2. ## Database configuration: 
Ensure PostgreSQL is running on your system with the following credentials:

**Host**: localhost
**Port**: 5432
**User**: postgres
**Password**: <tomas3782>
**Database**: notes_app

You can modify this configuration in the file backend/src/app.module.ts.

3. ## Start the server: (bash)
npm run start

The backend will be available at:

**Backend URL**: http://localhost:3000
**API Documentation**: http://localhost:3000/api 

**Start the Application**

To start the application easily, you can use the start.sh script located in the root directory. This script will:

1. Install all dependencies for the backend.
2. Start the backend server.

## Run the script with the following command: (bash)
start.sh 

Once the script completes, the backend will be running at:

**Backend URL**: http://localhost:3000
**API Documentation**: http://localhost:3000/api
