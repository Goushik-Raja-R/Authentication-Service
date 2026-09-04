# 02 — Docker Fundamentals

## What problem does Docker solve?
A backend depends on more than source code:
```text
Node.js version
npm dependencies
PostgreSQL
environment variables
OS libraries
network configuration
storage
```
Docker makes the runtime reproducible.

## Core mental model
### Image
An image is the packaged blueprint used to create containers.
```text
Image → Container
```

### Container
A container is a running instance created from an image.
```text
Image → Container → Running process
```

### Docker Engine
Docker Engine builds images and creates/runs/manages containers.

## Important commands
```bash
docker --version
docker images
docker ps
docker ps -a
```

## General lifecycle
```text
Dockerfile
   ↓
docker build
   ↓
Image
   ↓
docker run
   ↓
Container
   ↓
docker logs / inspect / exec
   ↓
docker stop
   ↓
docker rm
```

> [!IMPORTANT]
> Images, containers, networks and volumes are separate Docker resources.
