# Notification System Server

## Tech Stack
- **Runtime**: Bun
- **Framework**: Elysia
- **Database**: SQLite + Prisma ORM
- **WebSocket**: Elysia built-in
- **Scheduler**: node-cron
- **Documentation**: Swagger UI

## How It Works
1. **REST API** → Create/manage notifications and cron jobs
2. **WebSocket** → Real-time delivery to online users
3. **CronJob** → Scheduled notifications and daily summaries

## API Endpoints

### Core
- `GET /` → API info
- `GET /ping` → Health check
- `GET /swagger` → API documentation

### Notifications
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/notifications` | Create notification |
| `GET` | `/api/notifications/:userId` | Get user notifications |
| `PUT` | `/api/notifications/:id/read` | Mark as read |

### CronJobs (Admin)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/cronjobs` | List all jobs |
| `POST` | `/api/cronjobs` | Create job |
| `PUT` | `/api/cronjobs/:id` | Update job |
| `DELETE` | `/api/cronjobs/:id` | Delete job |
| `POST` | `/api/cronjobs/:id/start` | Start job |
| `POST` | `/api/cronjobs/:id/stop` | Stop job |

### Database
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/seed` | Seed database with test data |

### WebSocket
- Local: `ws://localhost:5555/ws`
- Docker: `ws://localhost:5555/ws`

## Usage

### Start Server

#### Local Development
```bash
bun dev                # Development with hot reload
bun run db:seed        # Seed test data
curl -X POST http://localhost:5555/api/seed  # Seed via API
```

#### Docker Compose
```bash
# Build and start containers
docker-compose up --build

# Run in background
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f notification-server
```

### Test API
```bash
# Local development (port 5555)
curl http://localhost:5555/ping
curl http://localhost:5555/swagger

# Docker compose (port 5555)
curl http://localhost:5555/ping
curl http://localhost:5555/swagger
```

### Create Notification
```bash
# System notification (to all users)
curl -X POST http://localhost:5555/api/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "title": "System Alert",
    "message": "Server maintenance at 2AM",
    "type": "warning",
    "category": "system"
  }'

# User-to-user notification
curl -X POST http://localhost:5555/api/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user2",
    "senderId": "user1",
    "title": "Private Message",
    "message": "Hello from Alice",
    "type": "info",
    "category": "user-to-user"
  }'
```

### WebSocket Messages

#### Client → Server
```json
{"type": "register", "userId": "user1"}
{"type": "markAsRead", "notificationId": "abc123"}
```

#### Server → Client
```json
{"type": "notification", "data": {"id": "abc", "title": "Alert", "message": "...", "type": "info"}}
{"type": "cronjob_status", "data": {"cronJobId": "xyz", "status": "started", "message": "Job started"}}
```

## Key Features
- ✅ Real-time notifications via WebSocket
- ✅ System notifications → broadcast to all users
- ✅ User-to-user notifications → specific recipient
- ✅ Dynamic cron job management
- ✅ Scheduled notifications
- ✅ Admin dashboard support
- ✅ Auto-generated API docs

## Database
- **Users**: id, email, name, password, role, isOnline
- **Notifications**: userId, senderId, title, message, type, category, isRead
- **CronJobs**: name, cronExpression, jobType, isActive, jobData