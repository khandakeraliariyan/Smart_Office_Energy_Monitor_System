# Smart Office Energy Monitoring System

This repository contains a full-stack smart office monitoring application built for the IUT RS Techathon. The system combines a live React dashboard with a Node.js backend to track room activity, device power use, alerts, analytics, and AI-generated office insights in real time.

## Overview

The project is split into two main parts:

- Frontend: a Vite + React dashboard for visualizing office energy usage and live alerts
- Backend: an Express + MongoDB API with Socket.IO updates, device simulation, and background scheduling

## Key Features

- Live energy and device monitoring dashboard
- Room and device management
- Real-time alert updates through Socket.IO
- Historical power analytics and charts
- AI-powered office insights (Gemini-based when configured)
- Automated device simulation and scheduler jobs

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Socket.IO client

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- Node Cron
- Joi
- Helmet and compression middleware

## Project Structure

```text
backend/   - Express API, MongoDB models, simulator, scheduler
frontend/  - React dashboard and UI components
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 18+ and npm
- A MongoDB instance or MongoDB Atlas connection string
- Optional: a Gemini API key for AI insights

## Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd Techathon2026-IUT_Dijkstra
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
```

Seed demo data:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The dashboard will be available at `http://localhost:5173`.

## Available Scripts

### Backend
- `npm run dev` - start the backend with nodemon
- `npm start` - start the backend in production mode
- `npm run seed` - populate sample rooms, devices, and alerts
- `npm run discord:bot` - run the Discord bot service

### Frontend
- `npm run dev` - start the Vite development server
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint checks

## Notes

- If `GEMINI_API_KEY` is not provided, the backend will fall back to a built-in insight summary.
- The backend automatically starts the simulator, scheduler, and socket server when launched.

For more detailed usage and endpoint information, see the backend and frontend README files.
