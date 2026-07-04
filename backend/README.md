# Backend README

This backend powers the smart office energy monitoring system. It exposes REST APIs for devices, rooms, analytics, alerts, and AI insights while also broadcasting live updates to the frontend over Socket.IO.

## What the backend does

- Serves the dashboard and analytics API
- Persists office and device data in MongoDB
- Simulates device activity and power consumption
- Triggers alert checks and stores power history
- Provides AI-generated office summaries using Gemini
- Runs a Discord bot integration for notifications

## Tech stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- Node Cron
- Joi
- Helmet, CORS, compression, morgan

## Project structure

```text
src/
  app.js                 # Express app setup
  server.js              # Server bootstrap and socket startup
  config/                # Database connection
  controllers/           # API request handlers
  routes/                # API endpoints
  services/              # Business logic
  models/                # Mongoose schemas
  sockets/               # Socket.IO setup
  simulator/             # Device simulation logic
  jobs/                  # Scheduled background jobs
  discord/               # Discord bot integration
  utils/                 # Helpers and logging
```

## Environment variables

Create a `.env` file in this folder:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
```

## Installation

```bash
cd backend
npm install
```

## Run locally

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

The API will run at `http://localhost:5000`.

## Seed demo data

```bash
npm run seed
```

This populates sample rooms, devices, and office configuration data for the dashboard.

## Main API groups

The backend exposes these API areas under `/api/v1`:

- `/devices` - device data and status updates
- `/rooms` - room information
- `/dashboard` - summary dashboard payload
- `/power` - power usage and power history
- `/alerts` - alert listing and state
- `/analytics` - analytics metrics
- `/ai` - AI-generated insights
- `/discord` - Discord integration routes

## Background services

When the server starts, it also launches:

- a device simulator that updates office device activity
- a scheduler that checks alerts and logs power snapshots
- Socket.IO event broadcasting for live updates

## Useful scripts

- `npm run dev` - start with nodemon
- `npm start` - start the production server
- `npm run seed` - load sample data
- `npm run discord:bot` - run the Discord bot separately
| dashboardUpdated |

---

## Database Collections

- rooms
- devices
- alerts
- powerlogs

---

## Architecture

```
Client
    │
    ▼
Express API
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
MongoDB
    │
    ▼
Socket.IO
```

---

## Future Improvements

- JWT Authentication
- Role-based Access Control
- Redis Caching
- MQTT Integration
- ESP32 Integration
- AI-powered Energy Analytics
- Docker Deployment
- Unit & Integration Testing

---

## Developed For

IUT RS Techathon