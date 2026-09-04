# 13 — Authentication Service Dockerization

## Goal
Make the Node.js/TypeScript Authentication Service and PostgreSQL runtime reproducible with Docker.

## Final architecture
```text
                    Host
                     │
              port 3000 published
                     │
                     ▼
       ┌──────────────────────────┐
       │ authentication-service   │
       │ Node.js / Express        │
       │ Docker container         │
       └────────────┬─────────────┘
                    │
          authentication-network
                    │
                    ▼
       ┌──────────────────────────┐
       │ PostgreSQL               │
       │ Docker container         │
       └────────────┬─────────────┘
                    │
                    ▼
             postgres-data
                volume
```

## Final Dockerfile
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci
COPY tsconfig.json .
COPY src /app/src
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci --omit dev
COPY --from=builder /app/dist /app/dist
USER node
CMD ["npm", "start"]
```

## Why USER node?
Without an explicit user, the process may run with the image's default user, commonly root. `USER node` runs the application with a restricted user and follows least privilege.

We verified:
```bash
docker compose exec authentication-service whoami
```
Result:
```text
node
```

## Final Compose responsibilities
- `postgres` runs PostgreSQL.
- `authentication-service` builds/runs the API.
- `authentication-network` provides internal communication.
- `postgres-data` preserves database data.
- Docker Secrets provide sensitive runtime values.
- PostgreSQL healthcheck controls readiness.
- `depends_on` waits for database health.
- `3000:3000` publishes the API port.
- `restart: unless-stopped` improves runtime resilience.

## Final .dockerignore
```text
node_modules
.env
.env.postgres
secrets/
.git
.obsidian
Development Difficulties & Resolutions
docs
dist
```

## Final verification
```bash
docker compose down
docker compose up -d --build
docker compose ps
docker compose logs authentication-service
docker compose exec authentication-service whoami
```

The stack was recreated successfully, PostgreSQL was healthy, the API started, and `whoami` returned `node`.

## Deployment boundary
At this point the application is **Dockerized and locally deployment-ready**.

The next stage is cloud deployment:
```text
Local Docker
     ↓
Cloud Linux server
     ↓
Docker
     ↓
Production networking
     ↓
Domain / DNS
     ↓
Reverse proxy
     ↓
HTTPS
```

These notes stop here intentionally.
