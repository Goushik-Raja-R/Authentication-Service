# 11 — Container Lifecycle & Debugging

## Lifecycle
```text
image
  ↓
create/start
  ↓
running
  ↓
stop
  ↓
stopped
  ↓
remove
```

A container can be recreated from the same image.

## Status
```bash
docker compose ps
```

Our final verification showed:
```text
authentication-service   Up
postgres                 Up (healthy)
```

## Logs
```bash
docker compose logs authentication-service
```

We verified:
```text
PostgreSQL Connected Successfully
Cleanup Done
Server Running on PORT: 3000
```

These proved:
1. Node application started.
2. Database connection succeeded.
3. Cleanup job started.
4. Express server was listening.

## Inspect
```bash
docker inspect CONTAINER
```

## Execute
```bash
docker compose exec authentication-service whoami
```

Result:
```text
node
```

This verified the application container runs as the non-root user.

## Clean recreation test
```bash
docker compose down
docker compose up -d --build
```

This proved the stack could be recreated from the current configuration. The PostgreSQL named volume remained available.

## Debugging principle
Separate the layers:
```text
Host
 ↓
Docker
 ↓
Container
 ↓
Application process
 ↓
Network
 ↓
Database
```
Verify each layer independently.
