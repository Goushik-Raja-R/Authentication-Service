# 09 — Volumes & Persistent Data

## Why volumes?
Containers are disposable. Database data must survive container recreation.

We defined:
```yaml
volumes:
  postgres-data:
```

and:
```yaml
volumes:
  - postgres-data:/var/lib/postgresql
```

## Mental model
```text
PostgreSQL container
       │
       ▼
/var/lib/postgresql
       │
       ▼
postgres-data volume
       │
       └── survives container recreation
```

## docker compose down
```bash
docker compose down
```

Normally removes Compose containers and network but preserves named volumes.

```text
containers → removed
network    → removed
volume     → preserved
```

## Important warning
```bash
docker compose down -v
```

The `-v` option removes Compose-managed volumes and can destroy database data.

> [!IMPORTANT]
> Persistent database data belongs to the volume, not the disposable PostgreSQL container.
