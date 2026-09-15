# Authentication Service

A production-style backend authentication service built with TypeScript,
Node.js, Express.js, and PostgreSQL.

This project focuses on designing and implementing a secure,
maintainable authentication system with token-based authentication,
authorization, database persistence, and production-oriented
deployment practices.

## Overview

The Authentication Service provides the backend foundation for
secure user authentication and authorization.

The system implements:

- User registration and login
- Password hashing
- JWT-based access tokens
- Refresh tokens
- Refresh token persistence and validation
- Refresh token rotation
- Role-Based Access Control (RBAC)
- Rate limiting
- Logout and session management
- PostgreSQL database integration
- Docker-based deployment
- Nginx reverse proxy
- AWS EC2 deployment
- CI/CD

## Architecture

The application follows a layered backend architecture that separates
HTTP handling, business logic, data access, and infrastructure concerns.

```text
Client
  │
  ▼
Express.js API
  │
  ├── Middleware
  │     ├── Authentication
  │     ├── Authorization (RBAC)
  │     └── Rate Limiting
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ▼
Repositories
  │
  ▼
PostgreSQL
```

### Infrastructure

```text
Application
    │
    ▼
Docker
    │
    ▼
Nginx
    │
    ▼
AWS EC2
    │
    ▼
PostgreSQL
```

The application is containerized with Docker and deployed on AWS EC2,
with Nginx acting as the reverse proxy in front of the application.
