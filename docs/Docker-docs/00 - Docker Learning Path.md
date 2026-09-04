# Docker Learning Path — Authentication Service

> [!NOTE]
> This documentation records the Docker journey used for the Authentication Service: from WSL/Ubuntu setup through Dockerization and production-readiness, stopping immediately before cloud deployment.

## Learning path
```text
WSL + Ubuntu
    ↓
Docker installation
    ↓
Docker fundamentals
    ↓
Images & containers
    ↓
docker run
    ↓
Environment variables
    ↓
PostgreSQL container
    ↓
Volumes / persistence
    ↓
Docker networking
    ↓
Container-to-container communication
    ↓
Docker DNS / container names
    ↓
Dockerfile
    ↓
Multi-stage builds
    ↓
.dockerignore
    ↓
Docker Compose
    ↓
Secrets
    ↓
Production configuration
    ↓
Build / run / inspect / logs / debugging
    ↓
Non-root runtime
    ↓
Clean recreation test
    ↓
READY FOR DEPLOYMENT
```

Read the files in numerical order. Each stage explains **what**, **why**, **how**, and how the concept applied to the Authentication Service.

## Current stopping point
The Authentication Service runs successfully in Docker Compose, PostgreSQL is healthy, persistent storage is configured, secrets are mounted, the application runs as the non-root `node` user, and the stack has been cleanly recreated and tested.

The next phase is **cloud deployment**.
