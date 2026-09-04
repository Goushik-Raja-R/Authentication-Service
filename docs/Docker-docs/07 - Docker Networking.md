# 07 — Docker Networking

## Why networking?
The Authentication Service needs to communicate with PostgreSQL.

```text
Authentication Service
          │
          ▼
   Docker network
          │
          ▼
      PostgreSQL
```

## Commands
List networks:
```bash
docker network ls
```

Inspect:
```bash
docker network inspect NETWORK
```

Create a user-defined bridge:
```bash
docker network create authentication-network
```

Connect:
```bash
docker network connect NETWORK CONTAINER
```

Disconnect:
```bash
docker network disconnect NETWORK CONTAINER
```

## Default networks
We learned:
```text
bridge
host
none
```

## Container IP vs container name
A container IP can change when a container is recreated. On a user-defined network, Docker provides DNS/service-name resolution.

```text
Authentication Service
        │
        │ postgres:5432
        ▼
Docker DNS
        │
        ▼
Current PostgreSQL container IP
```

Therefore, service/container names are preferred over hardcoded container IPs.

## Multiple networks
A container can attach to multiple networks. This can separate public-facing and private database communication.

## Our project
Compose defines:
```yaml
networks:
  authentication-network:
```
Both services join it.

> [!IMPORTANT]
> A Docker network is different from publishing a port. Internal container communication does not require publishing the database port to the host.
