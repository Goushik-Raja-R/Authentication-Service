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

## Authentication & Security

The service implements a token-based authentication system with
multiple layers of security.

### Authentication Flow

```text
Register
   │
   ▼
Validate User Input
   │
   ▼
Hash Password
   │
   ▼
Store User in PostgreSQL
```

```text
Login
   │
   ▼
Validate Credentials
   │
   ▼
Generate Access Token
   │
   ▼
Generate Refresh Token
   │
   ▼
Store Refresh Token
   │
   ▼
Return Tokens to Client
```

### Access Token

The access token is used to authenticate protected API requests.

```text
Client
  │
  │ Authorization: Bearer <access_token>
  ▼
Authentication Middleware
  │
  ▼
Verify JWT
  │
  ▼
Allow / Reject Request
```

### Refresh Token

Refresh tokens are persisted and validated by the server.

The refresh-token flow includes:

- JWT verification
- Database existence check
- Revocation check
- Expiration check
- Refresh-token rotation
- Logout and session invalidation

### Role-Based Access Control

RBAC is implemented through authorization middleware.

```text
Authenticated User
        │
        ▼
   JWT Verification
        │
        ▼
    User Role
        │
        ▼
 Authorization Middleware
        │
     ┌──┴──┐
     ▼     ▼
   Allow  Reject
```

### Rate Limiting

Rate limiting is applied to protect authentication endpoints
from excessive requests and abuse.
