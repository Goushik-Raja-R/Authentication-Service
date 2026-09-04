# 04 — Dockerfile & Building Images

## What is a Dockerfile?
A Dockerfile is a set of instructions telling Docker how to build an image.

For our Authentication Service:
```text
Choose runtime
   ↓
Set working directory
   ↓
Copy package manifests
   ↓
Install dependencies
   ↓
Copy source
   ↓
Build TypeScript
   ↓
Prepare production image
   ↓
Start application
```

## Current Dockerfile
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

## Important instructions
- `FROM` — chooses the base image.
- `WORKDIR` — sets the working directory.
- `COPY` — copies files into the image.
- `RUN` — executes a build-time command.
- `CMD` — defines the default runtime command.

## Build
```bash
docker build -t authentication-service .
```

The `.` is the build context.

## Compose rebuild without cache
```bash
docker compose build --no-cache authentication-service
```

This forces Docker to rebuild instead of reusing cached layers.

> [!NOTE]
> `--no-cache` is useful for verification/debugging; it is not required for every normal build.
