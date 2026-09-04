# 03 — Images & Containers

## Creating a container
```bash
docker run IMAGE
```

Example:
```bash
docker run postgres
```

## Naming containers
```bash
docker run --name my-postgres postgres
```

A name makes containers easier to identify and later becomes useful for Docker DNS on user-defined networks.

## Lifecycle
```bash
docker start CONTAINER
docker stop CONTAINER
docker rm CONTAINER
```

## Inspect
```bash
docker inspect CONTAINER
```

Useful for configuration, networking and mounts.

## Execute inside a container
```bash
docker exec -it CONTAINER sh
```

## Logs
```bash
docker logs CONTAINER
docker logs -f CONTAINER
```

## Key lesson
```text
Container = disposable runtime
Volume    = persistent data
```
This distinction became critical for PostgreSQL.
