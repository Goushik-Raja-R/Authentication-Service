# 05 — Multi-Stage Production Builds

## Why multiple stages?
TypeScript compilation needs build dependencies and source files. The runtime only needs what is required to execute the compiled application.

```text
builder
  ↓
TypeScript compilation
  ↓
dist/

production
  ↓
production dependencies
  ↓
dist/
  ↓
npm start
```

## Builder
```dockerfile
FROM node:20-alpine AS builder
RUN npm ci
RUN npm run build
```

## Production
```dockerfile
FROM node:20-alpine AS production
RUN npm ci --omit dev
COPY --from=builder /app/dist /app/dist
```

## Why it matters
The final image does not need:
- TypeScript source
- development dependencies
- the build toolchain

This produces a cleaner runtime image.

> [!IMPORTANT]
> Multi-stage builds concern image construction. Docker Compose concerns coordinating/running services.
