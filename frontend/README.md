# Frontend README

This frontend provides the smart office monitoring dashboard for the full-stack energy management system. It displays live office status, device controls, power usage, alerts, analytics, and AI insights.

## Features

- Real-time dashboard view for rooms and devices
- Power usage visualization with charts
- Live alerts panel
- Device toggling and room-based organization
- Analytics cards and AI insight summaries
- Responsive UI built with React and Tailwind CSS

## Tech stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Socket.IO client
- Axios

## Project structure

```text
src/
  App.jsx                # Main app entry
  main.jsx               # React mount point
  pages/Dashboard.jsx    # Main dashboard page
  components/            # UI components
  hooks/                 # Data and socket hooks
  services/              # API and socket service layers
```

## Installation

```bash
cd frontend
npm install
```

## Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available scripts

- `npm run dev` - start the Vite development server
- `npm run build` - build the production bundle
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint

## Notes

- The UI expects the backend API to be running on `http://localhost:5000`.
- Some charts and insights will update automatically when the backend sends live events.
