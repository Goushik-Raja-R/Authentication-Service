# 06 — Environment Variables & Secrets

## Why configuration should not be hardcoded
Configuration changes between development, testing and production. Passwords and JWT keys should not be committed to source code.

## Environment variables
The application reads configuration through `process.env`.

Example:
```text
PORT=3000
DATABASE_URL=...
```

## Docker Compose env files
```yaml
env_file:
  - .env
```

PostgreSQL:
```yaml
env_file:
  - .env.postgres
```

## Docker Secrets
Sensitive values are mounted as runtime secrets:
```yaml
secrets:
  - jwt_secret
  - jwt_refresh_secret
  - postgres_password
```

They appear inside the container under:
```text
/run/secrets/
```

Our configuration reads them when available.

## Local vs Docker
```text
Local development → environment variables
Docker runtime    → Docker secret files
```

## .dockerignore
We exclude:
```text
.env
.env.postgres
secrets/
```

This keeps sensitive files out of the Docker build context.

> [!IMPORTANT]
> `.dockerignore` controls the build context. Docker Compose secrets control runtime secret mounting. They solve different problems.
