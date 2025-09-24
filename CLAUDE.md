# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Local Development
- `bun dev` - Start development server with file watching
- `bun run build` - Build the application for production
- `bun start` - Run the production build

### Database Commands
- `bunx prisma generate` - Generate Prisma client after schema changes
- `bunx prisma db push` - Push schema changes to SQLite database
- `bunx prisma studio` - Open Prisma Studio for database management
- `bun run prisma/seed.ts` - Seed the database with test data

### Docker Commands
- `docker-compose up --build` - Build and start containerized application
- `docker-compose up -d` - Run containers in background
- `docker-compose down` - Stop and remove containers
- `docker-compose logs -f notification-server` - View application logs

### Testing and Quality
No specific test or lint commands are configured. Check with the user if testing is needed.

## Architecture Overview

### Tech Stack
- **Runtime**: Bun (JavaScript runtime)
- **Framework**: Elysia (TypeScript web framework)
- **Database**: SQLite with Prisma ORM
- **WebSocket**: Built-in Elysia WebSocket support
- **Scheduler**: node-cron for background jobs
- **API Documentation**: Swagger UI via @elysiajs/swagger
- **Containerization**: Docker with Docker Compose

### Core Components

#### Database Models (Prisma Schema)
- **User**: Manages user accounts with authentication, role-based access, and online status
- **Notification**: Stores notifications with support for system-wide and user-to-user messaging
- **CronJob**: Manages scheduled tasks with cron expressions and job metadata

#### Application Structure
```
src/
├── server.ts           # Main application entry point with Elysia setup
├── routes/             # Route definitions
│   ├── index.ts        # Route aggregation
│   ├── notificationRoutes.ts
│   └── cronJobRoutes.ts
├── controllers/        # Request handlers
├── services/           # Business logic layer
├── websocket/          # WebSocket connection management
└── jobs/               # Cron job management and scheduling
```

#### Key Features
- **Real-time Communication**: WebSocket server for live notifications
- **Dynamic Scheduling**: Runtime cron job creation and management
- **Dual Notification System**: System broadcasts and user-to-user messaging
- **Admin Interface Support**: Role-based access for cron job management

### Deployment Options

#### Local Development
- Port: 5555
- WebSocket: `ws://localhost:5555/ws`
- API Documentation: `http://localhost:5555/swagger`

#### Docker Compose
- External Port: 5555 (mapped to container port 5555)
- WebSocket: `ws://localhost:5555/ws`
- API Documentation: `http://localhost:5555/swagger`
- Persistent SQLite database via Docker volumes

### Environment Configuration
- **PORT**: Application port (default: 5555)
- **CLIENT_URL**: CORS allowed origin (default: http://localhost:6666)
- **DATABASE_URL**: SQLite database path (file:./prisma/dev.db)
- **NODE_ENV**: Runtime environment (production for Docker)