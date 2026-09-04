# 08 — PostgreSQL with Docker

## Why PostgreSQL in Docker?
We wanted the Authentication Service and its database to be reproducible services managed together.

```text
Docker Compose
   ├── authentication-service
   └── postgres
```

## PostgreSQL image
```yaml
postgres:
  image: postgres:18
```

## Healthcheck
```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U postgres -d authentication_management"]
  interval: 5s
  timeout: 5s
  retries: 5
  start_period: 10s
```

A running container does not necessarily mean the service inside is ready.

## Dependency
```yaml
depends_on:
  postgres:
    condition: service_healthy
```

This makes the authentication service wait for PostgreSQL health.

## Critical networking lesson
Inside a container:
```text
localhost = that same container
```

It does not automatically mean another container.

Database communication should use the Docker network/service name.
