# mmmssas
# Dronacharya The Fitness Gurukula

A complete premium fitness gym website with a full-stack architecture.

## Project Overview
This project contains a customer-facing responsive frontend (bilingual: English & Kannada) and a secure admin backend for managing enquiries.

## Technology Stack
- **Frontend**: React, TypeScript, Vite, Vanilla CSS with custom CSS variables
- **Backend**: Node.js, Express, TypeScript, Prisma, SQLite
- **Authentication**: JWT & bcrypt

## Project Structure
- `/client` - Frontend React application
- `/server` - Backend Node.js application

## Installation

1. Install dependencies for both client and server:
   ```bash
   cd client
   npm install
   
   cd ../server
   npm install
   ```

## Environment Variables
Create a `.env` file in the `server` directory and `client` directory based on `.env.example` or the following structure.

**server/.env**:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
ADMIN_USERNAME=admin
ADMIN_INITIAL_PASSWORD=secretpassword
DATABASE_URL="file:./dev.db"
```

**client/.env**:
```env
VITE_BUSINESS_NAME="Dronacharya The Fitness Gurukula"
VITE_BUSINESS_PHONE="08197407623"
VITE_BUSINESS_ADDRESS="Opposite Government Hospital, Next to Ranga Theatre, Krishnarajapete, Karnataka 571426, India"
VITE_BUSINESS_RATING="4.9"
VITE_BUSINESS_REVIEW_COUNT="93"
VITE_INSTAGRAM_URL="https://www.instagram.com/dronacharya_d_fitness_gurukula/"
VITE_GOOGLE_MAPS_URL=""
VITE_API_URL="http://localhost:5000/api"
```

## Database Setup & Prisma Migration
In the `server` directory, run:
```bash
npx prisma generate
npx prisma db push
```

## Development
To start the development servers:

**Terminal 1 (Backend)**:
```bash
cd server
npm run dev
# OR: npx ts-node src/index.ts
```

**Terminal 2 (Frontend)**:
```bash
cd client
npm run dev
```

## Production Build & Start
### Building Frontend
```bash
cd client
npm run build
```
The output will be in `client/dist`. You can serve this via Nginx, Apache, or any static hosting.

### Building & Running Backend
```bash
cd server
npx tsc
node dist/index.js
```
The server will initialize the admin user automatically if it doesn't exist based on the `.env` variables.

## Admin Setup
1. Configure `ADMIN_USERNAME` and `ADMIN_INITIAL_PASSWORD` in `server/.env`.
2. Start the backend. The admin user will be created on startup.
3. Access the dashboard via `/admin` on the frontend.
4. Ensure you change your `JWT_SECRET` for production!

## Changing Business Information
Update the `VITE_BUSINESS_*` variables in `client/.env`. The frontend uses these to populate the navbar, footer, location section, and contact links dynamically.

## Google Maps Configuration
If you have a Google Maps embed URL or specific location URL, set `VITE_GOOGLE_MAPS_URL`. If left empty, a dynamic search link will be generated using the `VITE_BUSINESS_ADDRESS`.

## Instagram Configuration
Set `VITE_INSTAGRAM_URL`. If you want to remove the Instagram button, simply leave this variable empty.

## Image Management
Images are located in `client/public/images/`.
- `branding/logo.jpeg`
- `gym/main.jpg`, `interior-1.jpg`, `interior-2.jpg`, `hero-bg.jpg`

You can replace these files or add new ones to modify the visual assets.

## Troubleshooting
- **Database not found?** Run `npx prisma db push` inside `/server`.
- **API calls failing?** Check `VITE_API_URL` inside `client/.env`.
- **CORS Errors?** The backend allows standard CORS, ensure you are testing on `localhost` or configure the backend CORS setup if hosting on different domains.
