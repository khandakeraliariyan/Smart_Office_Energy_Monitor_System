# Smart Office Energy Monitoring Backend

> Production-quality Node.js + Express backend for an Office Energy Monitoring System.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-API-000000?logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?logo=socket.io&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Current-47A248?logo=mongodb&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Planned-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-Planned-2D3748?logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Planned-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## Table of Contents

- [1. Project Title](#1-project-title)
- [2. Overview](#2-overview)
- [3. Features](#3-features)
- [4. Tech Stack](#4-tech-stack)
- [5. Folder Structure](#5-folder-structure)
- [6. Backend Architecture](#6-backend-architecture)
- [7. Request Flow](#7-request-flow)
- [8. Device Simulation Engine](#8-device-simulation-engine)
- [9. Alert Engine](#9-alert-engine)
- [10. Database](#10-database)
- [11. API Documentation](#11-api-documentation)
- [12. WebSocket Events](#12-websocket-events)
- [13. Environment Variables](#13-environment-variables)
- [14. Installation](#14-installation)
- [15. Development](#15-development)
- [16. Error Handling](#16-error-handling)
- [17. Logging](#17-logging)
- [18. Security](#18-security)
- [19. Performance](#19-performance)
- [20. Testing](#20-testing)
- [21. Deployment](#21-deployment)
- [22. API Examples](#22-api-examples)
- [23. Troubleshooting](#23-troubleshooting)
- [24. Future Improvements](#24-future-improvements)
- [25. License](#25-license)

## 1. Project Title

**Smart Office Energy Monitoring Backend**

This backend powers a realtime office energy monitoring platform. It provides REST APIs, Socket.IO events, scheduled background processing, simulated device activity, alert generation, optional AI insights, and optional Discord bot support.

Repository role:

| Item | Description |
| --- | --- |
| Type | Backend API service |
| Runtime | Node.js |
| Framework | Express.js |
| Realtime | Socket.IO |
| Current database | MongoDB with Mongoose |
| Planned database | PostgreSQL |
| Planned ORM | Prisma |
| License | MIT |

## 2. Overview

The backend is the single source of truth for the Office Energy Monitoring System.

It serves three major consumers:

| Consumer | What it gets from the backend |
| --- | --- |
| Web Dashboard | Rooms, devices, power usage, alerts, analytics, and AI insights. |
| Discord Bot | Office status queries and notification workflows. |
| Device Simulator | Shared services for simulated smart-device state updates. |

Using one backend keeps business rules centralized. Device status, power calculations, alert logic, historical snapshots, and realtime events all flow through the same service layer instead of being duplicated across the dashboard, simulator, and bot.

The backend currently uses MongoDB and Mongoose. The requested PostgreSQL, Prisma, Docker, JWT, and testing items are documented as production placeholders where they are not yet implemented.

## 3. Features

### REST API

- Versioned API under `/api/v1`
- Device, room, dashboard, power, alert, analytics, AI, and Discord route groups
- Consistent JSON response wrapper
- Joi validation for supported write operations
- Centralized error middleware

### WebSocket Server

- Socket.IO server initialized with the HTTP server
- Realtime dashboard updates
- Event-driven updates for device, power, alert, and dashboard state
- Used by the frontend to avoid constant polling

### Device Simulation Engine

- Simulates smart-office activity without physical devices
- Runs every 5 seconds
- Randomly selects a device
- Applies office-hour behavior rules
- Updates device status
- Recalculates power usage
- Broadcasts updates to connected clients

### Alert Engine

- Checks alert rules in background jobs and simulator updates
- Detects devices active after office hours
- Detects rooms fully active for more than 2 hours
- Supports unresolved/resolved alert lifecycle
- Includes placeholder for high-power and spike rules

### Room Management

- Stores room metadata
- Links devices to rooms
- Supports room-wise power aggregation
- Provides room data to dashboard views

### Power Usage Calculation

- Calculates total active power
- Calculates room-wise active power
- Stores periodic power snapshots
- Provides historical power usage for charts

### Scheduler

- Uses `node-cron`
- Runs scheduled jobs every minute
- Checks alert rules
- Saves power snapshots
- Emits realtime update events

### Logging

- Uses `morgan` for HTTP request logs
- Uses a project logger utility for startup, scheduler, simulator, and error logs
- Keeps operational events visible during local development

### Error Handling

- Uses async controller wrapper
- Uses global Express error middleware
- Returns consistent error JSON
- Handles database startup failures explicitly

### Health Monitoring

- Current health check: `GET /`
- Requested production health endpoint: `GET /health`
- Readiness checks are planned for database, scheduler, and socket status

## 4. Tech Stack

| Category | Technology | Status |
| --- | --- | --- |
| Runtime | Node.js | Implemented |
| Framework | Express.js | Implemented |
| Current database | MongoDB | Implemented |
| Current ODM | Mongoose | Implemented |
| Requested database | PostgreSQL | Placeholder |
| Requested ORM | Prisma | Placeholder |
| Realtime | Socket.IO | Implemented |
| Validation | Joi | Partially implemented |
| Authentication | JWT | Placeholder |
| Logging | Morgan + custom logger | Implemented |
| Testing | Jest/Vitest + Supertest | Placeholder |
| Scheduler | Node Cron | Implemented |
| AI | Google Generative AI SDK | Implemented |
| Discord | Discord.js | Implemented |
| Security | Helmet, CORS | Implemented |
| Deployment | Docker | Placeholder |

## 5. Folder Structure

```text
backend/
  src/
    app.js
    server.js
    config/
    constants/
    controllers/
    discord/
    jobs/
    middleware/
    models/
    routes/
    scripts/
    services/
    simulator/
    sockets/
    utils/
    validators/
  package.json
  README.md
```

| Path | Purpose |
| --- | --- |
| `src/app.js` | Express app setup, middleware, routes, and error middleware. |
| `src/server.js` | Database connection, HTTP server, Socket.IO, simulator, and scheduler startup. |
| `src/config/` | Database and infrastructure configuration. |
| `src/constants/` | Shared constants such as Socket.IO event names. |
| `src/controllers/` | HTTP handlers that receive requests and return responses. |
| `src/routes/` | Express routers grouped by domain. |
| `src/services/` | Business logic for dashboard, devices, rooms, alerts, analytics, power, AI, simulator, and Discord. |
| `src/middleware/` | Error handling and validation middleware. |
| `src/validators/` | Joi validation schemas. |
| `src/sockets/` | Socket.IO initialization. |
| `src/simulator/` | Device simulator loop startup. |
| `src/jobs/` | Scheduled jobs. |
| `src/models/` | Mongoose models. |
| `src/discord/` | Discord bot integration. |
| `src/scripts/` | Seed and utility scripts. |
| `src/utils/` | Logger, API response wrapper, and async handler. |

Requested folders not currently present:

| Folder | Status |
| --- | --- |
| `database/` |  |
| `repositories/` |  |
| `alerts/` | Alert logic currently lives in `services/alert.service.js`. |
| `simulation/` | Simulation logic currently lives in `simulator/` and `services/simulator.service.js`. |

## 6. Backend Architecture

The backend follows a layered architecture:

```text
Client
  |
  v
Route
  |
  v
Controller
  |
  v
Service
  |
  v
Repository / Model
  |
  v
Database
```

| Layer | Responsibility |
| --- | --- |
| Client | Dashboard, Discord bot, simulator, or API tool. |
| Route | Maps HTTP method and URL to a controller. |
| Controller | Handles request/response logic. |
| Service | Applies business rules. |
| Repository / Model | Reads and writes data. |
| Database | Stores persistent system state. |

This architecture is used because it keeps the backend maintainable. Controllers stay thin, business logic remains reusable, and shared services can be used by REST endpoints, scheduled jobs, Socket.IO updates, the simulator, and the Discord bot.

## 7. Request Flow

```text
+-------------+
| Dashboard   |
+-------------+
      |
      | HTTP request
      v
+-------------+
| Express API |
+-------------+
      |
      | route -> controller
      v
+-------------+
| Service     |
+-------------+
      |
      | query/update
      v
+-------------+
| Database    |
+-------------+
      |
      | changed state
      v
+-------------+
| Socket.IO   |
+-------------+
      |
      | realtime event
      v
+-------------+
| Dashboard   |
| Update      |
+-------------+
```

Example:

1. Dashboard calls `PATCH /api/v1/devices/:id/status`.
2. Express forwards the request to the devices router.
3. Controller reads params and body.
4. Joi validates the body.
5. Device service updates the device.
6. MongoDB stores the changed state.
7. Power and dashboard data can be recalculated.
8. Socket.IO sends updates to connected clients.

## 8. Device Simulation Engine

The simulator makes the system demo-ready without real IoT hardware.

| Item | Value |
| --- | --- |
| Entry point | `src/simulator/deviceSimulator.js` |
| Main service | `src/services/simulator.service.js` |
| Interval | 5 seconds |
| Scheduler | `setInterval` |
| Office hours | `09:00 - 17:00` |

Simulation behavior:

- Fetch all devices
- Pick a random device
- Detect current hour
- Apply office-hour probability rules
- Update device status
- Recalculate power usage
- Check after-hours alerts
- Write logs
- Broadcast updates

Current probabilities:

| Time | Device | Behavior |
| --- | --- | --- |
| Office hours | Light | High chance of being ON |
| Office hours | Fan | Medium-high chance of being ON |
| After hours | Any device | Low chance of being ON |

Generated data includes:

- Boolean device state
- Updated `lastChanged` timestamp
- Current power contribution
- Room-wise power total
- Total office power

Broadcast events:

- `deviceUpdated`
- `powerUpdated`
- `alertUpdated`
- `dashboardUpdated`

## 9. Alert Engine

The alert engine detects abnormal office energy behavior.

Current service:

```text
src/services/alert.service.js
```

### Business Rules

| Rule | Status | Description |
| --- | --- | --- |
| Office hours | Implemented | Office hours are currently `09:00 - 17:00`. |
| Device running after hours | Implemented | Creates `AFTER_HOURS` alert for active devices outside office hours. |
| Device running too long | Implemented by room rule | Creates `ROOM_ACTIVE` alert when all room devices stay ON for more than 2 hours. |
| High power usage | Placeholder |  |

### Alert Lifecycle

```text
Detected
  |
  v
Created
  |
  v
Active
  |
  v
Resolved
```

Current alert types:

- `AFTER_HOURS`
- `ROOM_ACTIVE`
- `HIGH_POWER`

Current severities:

- `LOW`
- `MEDIUM`
- `HIGH`

Example alert:

```json
{
  "type": "AFTER_HOURS",
  "title": "Device Active After Office Hours",
  "message": "Main Light in Work Room 1 is still ON.",
  "severity": "HIGH",
  "resolved": false
}
```

## 10. Database

The current backend uses MongoDB with Mongoose. The requested PostgreSQL and Prisma setup is not currently implemented and is left as a production migration placeholder.

### Collections / Tables

| Requested Name | Current Model | Purpose |
| --- | --- | --- |
| Rooms | `Room` | Stores room metadata. |
| Devices | `Device` | Stores office devices and power ratings. |
| PowerHistory | `PowerLog` | Stores historical power snapshots. |
| Alerts | `Alert` | Stores alert records. |
| Users |  | Not implemented. |

### Room

| Field | Type | Notes |
| --- | --- | --- |
| `_id` | ObjectId | Primary identifier. |
| `name` | String | Required, unique. |
| `description` | String | Optional. |
| `createdAt` | Date | Auto timestamp. |
| `updatedAt` | Date | Auto timestamp. |

### Device

| Field | Type | Notes |
| --- | --- | --- |
| `_id` | ObjectId | Primary identifier. |
| `name` | String | Required. |
| `type` | String | `Light` or `Fan`. |
| `room` | ObjectId | References `Room`. |
| `status` | Boolean | ON/OFF state. |
| `powerRating` | Number | Rated active power. |
| `currentPower` | Number | Current power value. |
| `lastChanged` | Date | Last state update. |

### PowerHistory / PowerLog

| Field | Type | Notes |
| --- | --- | --- |
| `_id` | ObjectId | Primary identifier. |
| `totalPower` | Number | Total active power. |
| `roomPower` | Object | Room-wise power snapshot. |
| `createdAt` | Date | Snapshot time. |

### Alert

| Field | Type | Notes |
| --- | --- | --- |
| `_id` | ObjectId | Primary identifier. |
| `type` | String | Alert type. |
| `title` | String | Human-readable title. |
| `message` | String | Alert detail. |
| `room` | ObjectId | Optional room reference. |
| `severity` | String | `LOW`, `MEDIUM`, or `HIGH`. |
| `resolved` | Boolean | Lifecycle state. |

### ER Diagram Placeholder

```text
+---------+       +----------+
| Rooms   | 1   * | Devices  |
+---------+-------+----------+
| id      |       | id       |
| name    |       | roomId   |
+---------+       | status   |
                  | power    |
                  +----------+

+---------+       +----------+
| Rooms   | 1   * | Alerts   |
+---------+-------+----------+
| id      |       | roomId   |
| name    |       | type     |
+---------+       | resolved |
                  +----------+

+--------------+
| PowerHistory |
+--------------+
| id           |
| totalPower   |
| roomPower    |
| createdAt    |
+--------------+
```

## 11. API Documentation

Base URL:

```text
http://localhost:5001/api/v1
```

Root URL:

```text
http://localhost:5001/
```

### Endpoint Summary

| Method | Endpoint | Description | Parameters |
| --- | --- | --- | --- |
| `GET` | `/` | API running check | None |
| `GET` | `/api/v1/devices` | List devices | None |
| `GET` | `/api/v1/devices/:id` | Get one device | `id` |
| `PATCH` | `/api/v1/devices/:id/status` | Update device status | `id`, body `status` |
| `GET` | `/api/v1/rooms` | List rooms | None |
| `GET` | `/api/v1/dashboard` | Dashboard summary | None |
| `GET` | `/api/v1/power` | Current usage | None |
| `GET` | `/api/v1/power/history` | Usage history | None |
| `GET` | `/api/v1/alerts` | Active alerts | None |
| `GET` | `/api/v1/analytics` | Analytics data | None |
| `GET` | `/api/v1/ai` | AI insight | None |
| `GET` | `/api/v1/discord/ask` | Discord query route | Query/body depends on service |
| `POST` | `/api/v1/discord/ask` | Discord query route | Body depends on service |
| `GET` | `/health` |  |  |
| `GET` | `/usage` |  |  |
| `GET` | `/room/:id` |  |  |

### Endpoint Details

<details>
<summary>GET /api/v1/devices</summary>

Returns all devices.

Example request:

```bash
curl http://localhost:5001/api/v1/devices
```

Example response:

```json
{
  "success": true,
  "message": "Devices fetched successfully",
  "data": [],
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

Possible errors:

| Status | Reason |
| --- | --- |
| `500` | Internal server error |

</details>

<details>
<summary>GET /api/v1/devices/:id</summary>

Returns one device by ID.

Example request:

```bash
curl http://localhost:5001/api/v1/devices/DEVICE_ID
```

Example response:

```json
{
  "success": true,
  "message": "Device fetched successfully",
  "data": {
    "_id": "DEVICE_ID",
    "name": "Main Light",
    "type": "Light",
    "status": true
  },
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

Possible errors:

| Status | Reason |
| --- | --- |
| `404` | Device not found |
| `500` | Internal server error |

</details>

<details>
<summary>PATCH /api/v1/devices/:id/status</summary>

Updates a device status.

Example request:

```bash
curl -X PATCH http://localhost:5001/api/v1/devices/DEVICE_ID/status \
  -H "Content-Type: application/json" \
  -d "{\"status\":true}"
```

Example response:

```json
{
  "success": true,
  "message": "Device updated successfully",
  "data": {
    "_id": "DEVICE_ID",
    "name": "Main Light",
    "status": true
  },
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

Possible errors:

| Status | Reason |
| --- | --- |
| `400` | Invalid body |
| `404` | Device not found |
| `500` | Internal server error |

</details>

<details>
<summary>GET /api/v1/rooms</summary>

Returns room data.

Example request:

```bash
curl http://localhost:5001/api/v1/rooms
```

Example response:

```json
{
  "success": true,
  "message": "Rooms fetched successfully",
  "data": [],
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

</details>

<details>
<summary>GET /api/v1/alerts</summary>

Returns active alerts.

Example request:

```bash
curl http://localhost:5001/api/v1/alerts
```

Example response:

```json
{
  "success": true,
  "message": "Alerts fetched successfully",
  "data": [],
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

</details>

<details>
<summary>GET /api/v1/power</summary>

Returns current total and room-wise power usage.

Example request:

```bash
curl http://localhost:5001/api/v1/power
```

Example response:

```json
{
  "success": true,
  "message": "Power usage fetched successfully",
  "data": {
    "totalPower": 120,
    "roomPower": {
      "Work Room 1": 80,
      "Drawing Room": 40
    },
    "devices": []
  },
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

</details>

## 12. WebSocket Events

Socket server:

```text
http://localhost:5001
```

### Client Events

| Event | Payload | Description |
| --- | --- | --- |
| `connection` | Socket handshake | Client connects to server. |
| `disconnect` | None | Client disconnects. |

### Server Events

| Event | Payload | Description |
| --- | --- | --- |
| `deviceUpdated` | Device object | Device status changed. |
| `powerUpdated` | Power object | Power usage changed. |
| `alertUpdated` | Empty or refresh signal | Alerts may need refresh. |
| `dashboardUpdated` | Dashboard payload | Dashboard state changed. |

Example payload:

```json
{
  "updatedDevice": {
    "_id": "DEVICE_ID",
    "name": "Main Light",
    "status": true
  },
  "powerData": {
    "totalPower": 120
  },
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

## 13. Environment Variables

Create `backend/.env`.

```env
PORT=5001
NODE_ENV=development
MONGO_URI=
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash-lite
DISCORD_BOT_TOKEN=
DISCORD_BACKEND_URL=http://localhost:5001/api/v1/discord/ask
DATABASE_URL=
JWT_SECRET=
DISCORD_TOKEN=
OPENAI_KEY=
```

| Variable | Required | Status | Description |
| --- | --- | --- | --- |
| `PORT` | Yes | Implemented | Express and Socket.IO port. |
| `NODE_ENV` | No | Implemented | Runtime environment. |
| `MONGO_URI` | Yes | Implemented | MongoDB connection string. |
| `GEMINI_API_KEY` | No | Implemented | Gemini key for AI insights. |
| `GEMINI_MODEL` | No | Implemented | Gemini model name. |
| `DISCORD_BOT_TOKEN` | No | Implemented | Discord bot token. |
| `DISCORD_BACKEND_URL` | No | Implemented | Backend URL used by Discord service. |
| `DATABASE_URL` |  | Placeholder | PostgreSQL/Prisma connection string. |
| `JWT_SECRET` |  | Placeholder | JWT signing secret. |
| `DISCORD_TOKEN` |  | Placeholder | Requested name; current code uses `DISCORD_BOT_TOKEN`. |
| `OPENAI_KEY` |  | Placeholder | Requested name; current code uses Gemini. |

## 14. Installation

### Clone

```bash
git clone <repository-url>
cd Smart_Office_Energy_Monitor_System/backend
```

### Install

```bash
npm install
```

### Prisma Generate

```bash

```

Prisma is not currently installed.

### Database Migration

```bash

```

Current database setup uses MongoDB and the seed script.

### Seed Data

```bash
npm run seed
```

### Run Server

```bash
npm run dev
```

## 15. Development

| Command | Status | Description |
| --- | --- | --- |
| `npm run dev` | Implemented | Start with Nodemon. |
| `npm start` | Implemented | Start production server. |
| `npm run seed` | Implemented | Seed demo data. |
| `npm run discord:bot` | Implemented | Run Discord bot service. |
| `npm run build` |  | Not configured. |
| `npm run lint` |  | Not configured. |
| `npm test` |  | Not configured. |

Recommended local flow:

1. Start MongoDB or prepare MongoDB Atlas.
2. Fill `backend/.env`.
3. Run `npm install`.
4. Run `npm run seed`.
5. Run `npm run dev`.
6. Start the frontend dashboard.

## 16. Error Handling

The backend uses:

- `asyncHandler` for async controller errors
- Global error middleware in `src/middleware/errorMiddleware.js`
- Joi validation middleware for supported payloads
- Startup error handling for database connection failure

Error response shape:

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

Error categories:

| Type | Handling |
| --- | --- |
| Validation errors | Returned as request errors when validation fails. |
| Database errors | Logged and returned through middleware or startup failure. |
| Unknown errors | Returned as `500`. |
| Not found errors | Returned by controllers where implemented. |

## 17. Logging

Request logging:

- `morgan("dev")`
- Logs method, path, status, and timing in development

Application logging:

- Server startup
- Scheduler startup and job runs
- Simulator updates
- Scheduler errors
- Simulator errors

Error logging:

- Global error middleware prints unexpected errors
- Database connection logs failure details

## 18. Security

Current controls:

| Control | Status | Notes |
| --- | --- | --- |
| Helmet | Implemented | Sets HTTP security headers. |
| CORS | Implemented | Allows API access from frontend. |
| Input validation | Partial | Device status update uses Joi. |
| Environment variables | Implemented | Secrets expected in `.env`. |
| Rate limiting |  |  |
| Authentication |  |  |
| Role authorization |  |  |

Production recommendations:

- Restrict CORS origins
- Add rate limiting
- Add JWT authentication
- Add role-based access control
- Validate all route params, query strings, and bodies
- Store secrets in hosting secret managers

## 19. Performance

Current performance choices:

- Socket.IO avoids dashboard polling
- Background scheduler batches periodic alert and power work
- Power usage is computed from device state
- Compression middleware reduces response size

Recommended improvements:

- Add database indexes on `room`, `resolved`, `type`, and `createdAt`
- Cache dashboard summary data
- Use Redis for frequently requested state
- Use Socket.IO rooms for selective broadcasting
- Avoid broadcasting full payloads when a small patch is enough

## 20. Testing

Current automated test status:

```text

```

Recommended testing strategy:

| Test Type | Suggested Tool | Coverage |
| --- | --- | --- |
| API testing | Postman / Insomnia / curl | Manual endpoint checks. |
| Unit tests | Jest or Vitest | Services and utility functions. |
| Integration tests | Supertest | Express routes. |
| Database tests | MongoDB Memory Server | Model and service behavior. |
| Socket tests | socket.io-client | Realtime event emission. |

Recommended test cases:

- Device status update validation
- Current power calculation
- Room-wise power aggregation
- After-hours alert creation
- Room active alert creation
- Power history retrieval
- Root health response

## 21. Deployment

### Docker

Status:

```text

```

Recommended files:

- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`

### Railway

- Create Node.js service
- Add env variables
- Connect MongoDB Atlas
- Set start command to `npm start`

### Render

- Runtime: Node
- Build command: `npm install`
- Start command: `npm start`
- Add environment variables

### Vercel Backend

Status:

```text

```

This backend uses Express, Socket.IO, scheduler jobs, and long-running simulation, so a persistent server platform is preferred.

### AWS

Possible targets:

- EC2
- ECS
- Elastic Beanstalk
- App Runner

Recommended AWS services:

- Secrets Manager
- CloudWatch Logs
- Managed database provider

## 22. API Examples

### Health Check

```bash
curl http://localhost:5001/
```

```json
{
  "success": true,
  "message": "Smart Office Monitoring API Running"
}
```

### Get Devices

```bash
curl http://localhost:5001/api/v1/devices
```

```json
{
  "success": true,
  "message": "Devices fetched successfully",
  "data": [],
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

### Update Device Status

```bash
curl -X PATCH http://localhost:5001/api/v1/devices/DEVICE_ID/status \
  -H "Content-Type: application/json" \
  -d "{\"status\":false}"
```

```json
{
  "success": true,
  "message": "Device updated successfully",
  "data": {
    "_id": "DEVICE_ID",
    "status": false
  },
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

### Get Power Usage

```bash
curl http://localhost:5001/api/v1/power
```

```json
{
  "success": true,
  "message": "Power usage fetched successfully",
  "data": {
    "totalPower": 80,
    "roomPower": {
      "Work Room 1": 80
    },
    "devices": []
  },
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

### Get Alerts

```bash
curl http://localhost:5001/api/v1/alerts
```

```json
{
  "success": true,
  "message": "Alerts fetched successfully",
  "data": [],
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

## 23. Troubleshooting

### Database Connection

Check:

- `MONGO_URI` exists
- MongoDB is running
- Atlas IP allowlist is configured
- Credentials are correct
- Server was restarted after `.env` changes

### Socket Connection

Check:

- Backend is running on `5001`
- Frontend socket URL is `http://localhost:5001`
- CORS allows the frontend origin
- Browser console does not show WebSocket failures

### Discord Bot

Check:

- `DISCORD_BOT_TOKEN` is configured
- Bot token is valid
- Bot has required Discord permissions
- `DISCORD_BACKEND_URL` points to this backend

### Environment Variables

Check:

- `.env` is inside `backend/`
- Variable names match the code
- `dotenv.config()` runs before variable access
- Values do not contain accidental spaces

### Simulator

Check:

- Seed data exists
- Devices exist in MongoDB
- Backend startup completed
- Simulator startup log is visible
- Socket.IO events are received by the frontend

## 24. Future Improvements

- MQTT integration
- Real ESP32 support
- Redis caching
- JWT authentication
- Role management
- User accounts
- PostgreSQL migration
- Prisma schema and migrations
- Docker deployment
- Rate limiting
- Full request validation
- Unit and integration tests
- Swagger/OpenAPI docs
- Alert resolve endpoints
- Admin room/device management
- Advanced analytics
- Energy cost forecasting
- Exportable reports
- Multi-office support
- Socket.IO rooms and namespaces
- Production `/health` endpoint

## 25. License

MIT

See the root repository license file for full terms.
