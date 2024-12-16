# Notes Application

## Description:
This is a web-based note-taking application that allows users to:
- Create, edit, and delete notes.
- Archive and unarchive notes.
- Assign tags to notes and filter them by categories.
- Search for notes by title.

The application follows an SPA (Single Page Application) architecture with a separate backend (NestJS) and frontend (Angular).

---

## Technologies Used

### Backend:
- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Token)

### Frontend:
- **Framework**: [Angular](https://angular.io/)
- **Language**: TypeScript
- **UI Library**: Bootstrap 5

---

## Prerequisites:
Before running the application, ensure you have the following installed:
- **Node.js**: v18.17 or higher
- **npm**: v8.15 or higher
- **PostgreSQL**: v16.6 or higher

---

## Project Setup:

### Database Configuration:
Ensure PostgreSQL is running with the following configuration:
- **Host**: localhost  
- **Port**: 5432  
- **Username**: `postgres`  
- **Password**: `tomas3782`  
- **Database**: `notes_app`  

> ⚠️ You can modify this configuration in `backend/src/app.module.ts` if needed.

---

## Run the Application:

### Setting Permissions for the Script
After cloning the repository, you need to give execution permissions to the script:
### bash
cd my-cloned-repo
chmod +x start.sh

## Running the Application
### You can start the application with a single command using the provided script.

Ensure you're in the root of the project directory:
## bash: 
./start.sh

### Using the Script:
To simplify the process, you can use the `start.sh` script located in the root directory. This script will:
1. Install dependencies for both backend and frontend.
2. Initialize the database schema.
3. Start the backend server and the frontend application.

Run the script with the following command:

## Hoy to Use:
1. Login: 
Access the application and use the following credentials to log in:
Username: test
Password: 1234
2. Create Notes: Go to Create Note to add new notes.
3. View Notes: The active are listed on the homepage. Use search and filter options for better navigation. 
4. Edit/Delete Notes: Use the respective buttons in each note card. 
5. Archive/Unarchive Notes: Archive active notes or view archived ones using the navigation Menu. 

## Proyect Structure:

notes/
│
├── backend/       # Backend (NestJS + PostgreSQL)
│   ├── src/
│   │   ├── auth/       # Authentication logic
│   │   ├── notes/      # Notes management
│   │   ├── migrations/ # Database migrations
│   ├── package.json
│   └── ...
│
├── frontend/      # Frontend (Angular)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # UI Components
│   │   │   ├── services/   # HTTP Services
│   ├── package.json
│   └── ...
│
├── start.sh       # Startup script for the app
└── README.md      # Documentation


## Contributors: 
Developer: Tomas Casas
GitHub: https://github.com/tcasas7
