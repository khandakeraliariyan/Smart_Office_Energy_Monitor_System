# Smart Office Energy Monitoring System - Backend

Backend service for the **Smart Office Energy Monitoring System** built for the IUT RS Techathon.

This backend provides REST APIs, real-time communication using Socket.IO, device simulation, power monitoring, alert management, and data persistence using MongoDB.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.IO
- Node Cron
- Joi
- Helmet
- Morgan
- Compression
- Cookie Parser

---

## Project Structure

```
src/
│
├── config/
│   └── db.js
│
├── constants/
│   └── socketEvents.js
│
├── controllers/
│   ├── alert.controller.js
│   ├── dashboard.controller.js
│   ├── device.controller.js
│   ├── power.controller.js
│   └── room.controller.js
│
├── jobs/
│   └── scheduler.js
│
├── middleware/
│   ├── errorMiddleware.js
│   └── validate.js
│
├── models/
│   ├── Alert.js
│   ├── Device.js
│   ├── PowerLog.js
│   └── Room.js
│
├── routes/
│   ├── alert.routes.js
│   ├── dashboard.routes.js
│   ├── device.routes.js
│   ├── power.routes.js
│   └── room.routes.js
│
├── services/
│   ├── alert.service.js
│   ├── dashboard.service.js
│   ├── device.service.js
│   ├── power.service.js
│   ├── room.service.js
│   └── simulator.service.js
│
├── simulator/
│   └── deviceSimulator.js
│
├── sockets/
│   └── socket.js
│
├── utils/
│   ├── apiResponse.js
│   ├── asyncHandler.js
│   └── logger.js
│
├── app.js
└── server.js
```

---

## Features

- RESTful API
- Real-time updates using Socket.IO
- Smart device simulator
- Room management
- Device management
- Power monitoring
- Alert engine
- Background scheduler
- Historical power logging
- Dashboard API
- Modular service-based architecture

---

## API Endpoints

### Dashboard

| Method | Endpoint |
|---------|----------|
| GET | `/api/v1/dashboard` |

---

### Devices

| Method | Endpoint |
|---------|----------|
| GET | `/api/v1/devices` |
| GET | `/api/v1/devices/:id` |
| PATCH | `/api/v1/devices/:id/status` |

---

### Rooms

| Method | Endpoint |
|---------|----------|
| GET | `/api/v1/rooms` |

---

### Power

| Method | Endpoint |
|---------|----------|
| GET | `/api/v1/power` |

---

### Alerts

| Method | Endpoint |
|---------|----------|
| GET | `/api/v1/alerts` |

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

NODE_ENV=development

MONGO_URI=your_mongodb_connection_string
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Go to backend

```bash
cd backend
```

Install dependencies

```bash
npm install
```

---

## Seed Database

```bash
npm run seed
```

This creates:

- 3 Rooms
- 15 Devices
- Default office configuration

---

## Run Development Server

```bash
npm run dev
```

Server starts at

```
http://localhost:5000
```

---

## Production

```bash
npm start
```

---

## Scheduler

A background scheduler runs every minute and:

- Checks alert rules
- Saves power snapshots
- Generates historical power logs

---

## Simulator

The simulator runs automatically.

It periodically:

- Selects devices
- Updates ON/OFF status
- Calculates power
- Emits Socket.IO events
- Triggers alert checks

---

## Socket.IO Events

| Event |
|-------|
| deviceUpdated |
| powerUpdated |
| alertUpdated |
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