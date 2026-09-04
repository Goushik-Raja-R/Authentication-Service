# 12 — Docker Commands Reference

## Version
```bash
docker --version
```

## Images
```bash
docker images
docker build -t authentication-service .
docker compose build authentication-service
docker compose build --no-cache authentication-service
```

## Containers
```bash
docker ps
docker ps -a
docker run IMAGE
docker run --name NAME IMAGE
docker start CONTAINER
docker stop CONTAINER
docker rm CONTAINER
docker inspect CONTAINER
docker exec -it CONTAINER sh
docker logs CONTAINER
docker logs -f CONTAINER
```

## Networks
```bash
docker network ls
docker network inspect NETWORK
docker network create NETWORK
docker network connect NETWORK CONTAINER
docker network disconnect NETWORK CONTAINER
```

## Compose
```bash
docker compose up -d
docker compose up -d --build
docker compose down
docker compose ps
docker compose logs SERVICE
docker compose logs -f SERVICE
docker compose exec SERVICE COMMAND
```

## Dangerous command to understand
```bash
docker compose down -v
```

It additionally removes Compose-managed volumes. For PostgreSQL, understand the data-loss implication before using it.

> [!TIP]
> Learn Docker commands by resource type: images, containers, networks, volumes, and Compose services.
