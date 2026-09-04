# 10 — Docker Compose

## Why Compose?
Our stack contains:
```text
Authentication Service
PostgreSQL
Network
Volume
Secrets
Healthcheck
Restart policies
```

Compose describes this infrastructure declaratively in `compose.yaml`.

## Build
```yaml
authentication-service:
  build:
    context: .
    dockerfile: Dockerfile
```

## Image
```yaml
image: authentication-service
```

## Port mapping
```yaml
ports:
  - "3000:3000"
```

Meaning:
```text
Host port 3000 → container port 3000
```

So the API can be reached locally at:
```text
http://localhost:3000
```

## Port publishing vs networking
```text
ports:   host ↔ container
networks: container ↔ container
```

## Commands
```bash
docker compose up -d
docker compose up -d --build
docker compose down
docker compose ps
docker compose logs SERVICE
docker compose logs -f SERVICE
docker compose exec SERVICE COMMAND
```

## Restart policy
```yaml
restart: unless-stopped
```

This allows automatic restart after failures or Docker restarts unless intentionally stopped.

## Why Compose mattered
Instead of manually remembering many `docker run` commands, one file describes the complete local stack.
