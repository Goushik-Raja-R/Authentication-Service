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

   ## Database & Persistence

PostgreSQL is used as the primary relational database for persistent
application data.

The application uses a connection pool so database connections can be
reused across requests instead of creating a new connection for every
request. :contentReference[oaicite:1]{index=1}

### Database Responsibilities

The database is responsible for persisting:

- User information
- Authentication-related data
- Refresh tokens
- Token expiration information
- Token revocation state

### Refresh Token Persistence

Refresh tokens are stored in PostgreSQL and validated against the
database during the refresh flow.

```text
Client
   │
   │ Refresh Token
   ▼
Authentication Service
   │
   ├── Verify JWT
   │
   ├── Check database record
   │
   ├── Check expiration
   │
   ├── Check revocation
   │
   ▼
Generate New Access Token
```

This allows the server to invalidate refresh tokens and manage user
sessions beyond the lifetime of an individual access token.

### Database Migrations

Database schema changes are maintained through migration files,
providing a repeatable way to create and update the database schema.

## Docker & Deployment

The application is containerized using Docker to provide a consistent
runtime environment across development and deployment.

### Docker

The project includes:

- `Dockerfile` for building the application image
- `compose.yaml` for defining the application and supporting services
- `.dockerignore` to exclude unnecessary files from the Docker build context

The containerized application can be run independently of the host
environment, reducing differences between development and deployment.

### Deployment Architecture

```text
                    Internet
                       │
                       ▼
                    AWS EC2
                       │
                       ▼
                     Nginx
                  Reverse Proxy
                       │
                       ▼
               Docker Container
                       │
                       ▼
              Node.js / Express
                       │
                       ▼
                  PostgreSQL
```

### Nginx

Nginx is used as a reverse proxy in front of the backend application.

It provides a dedicated entry point for incoming requests and forwards
traffic to the Node.js application running inside the Docker environment.

### AWS EC2

The backend service is deployed on an AWS EC2 instance.

The EC2 environment hosts the containerized application and its
supporting infrastructure required to run the service.
```

### Rate Limiting

Rate limiting is applied to protect authentication endpoints
from excessive requests and abuse.

## CI/CD

The project is designed to use a CI/CD pipeline to automate
application validation and deployment.

### Continuous Integration

Every change pushed to the repository will trigger automated checks
to verify that the application remains buildable and maintainable.

The CI pipeline will include:

```text
Git Push
   │
   ▼
GitHub Actions
   │
   ├── Install Dependencies
   │
   ├── TypeScript Validation
   │
   ├── Build Application
   │
   └── Run Tests
          │
          ▼
       CI Result
```

### Continuous Deployment

After the CI checks pass, the deployment pipeline will automate the
process of delivering the application to the AWS EC2 environment.

```text
Git Push
   │
   ▼
GitHub Actions
   │
   ▼
CI Checks
   │
   ▼
Docker Build
   │
   ▼
Deployment
   │
   ▼
AWS EC2
   │
   ▼
Running Application
```

The goal of the pipeline is to reduce manual deployment steps and
provide a repeatable process for validating and deploying the service.

## API Endpoints

The Authentication Service exposes RESTful endpoints for user
registration, authentication, token management, profile access,
authorization, and session management.

### Authentication & User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Authenticate a user and issue tokens |
| `POST` | `/profile` | Retrieve the authenticated user's profile |
| `DELETE` | `/delete/users/:id` | Delete a user with authorization checks |

### Token & Session Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/refresh` | Generate a new access token using a refresh token |
| `POST` | `/logout` | Logout the current session |
| `POST` | `/logoutAll` | Logout from all active sessions |

### System Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check endpoint |
| `GET` | `/test-error` | Test endpoint for server error handling |

### Protected Requests

Protected endpoints use JWT-based authentication.

```text
Authorization: Bearer <access_token>
```

Requests requiring authentication are processed through the
authentication middleware before reaching the protected controller.

### Authorization

User roles are evaluated through authorization middleware for
operations that require specific permissions.

```text
Request
   │
   ▼
Authentication Middleware
   │
   ▼
Authorization Middleware
   │
   ▼
Controller
   │
   ▼
Service
```
## Project Structure

The project follows a layered backend architecture with separate
responsibilities for routing, request handling, business logic,
data access, error handling, background jobs, and application
configuration.

```text
src/
├── config/          # Application and database configuration
├── controllers/     # Handle incoming requests and responses
├── errors/          # Custom application errors and error handling
├── jobs/            # Background and scheduled jobs
├── middlewares/     # Authentication, authorization, validation, and rate limiting
├── repositories/    # Database access and persistence logic
├── routes/          # API route definitions
├── services/        # Business logic
├── types/           # TypeScript types and interfaces
├── utils/            # Shared utility functions
├── app.ts           # Express application configuration
└── server.ts        # Application entry point
```

### Layer Responsibilities

```text
Routes
   │
   ▼
Middlewares
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

- **Routes** define the API endpoints and connect requests to middleware and controllers.
- **Middlewares** handle cross-cutting concerns such as authentication, authorization, validation, and rate limiting.
- **Controllers** handle HTTP requests and responses.
- **Services** contain the application's business logic.
- **Repositories** handle database interaction and persistence.
- **Errors** provide centralized application error handling.
- **Jobs** contain background or scheduled tasks.
- **Config** manages application and database configuration.
- **Types** contain reusable TypeScript types and interfaces.
- **Utils** contain shared helper functionality.
- **`app.ts`** configures the Express application.
- **`server.ts`** starts the application.

## Environment Configuration

The application uses environment variables for runtime configuration
and sensitive authentication and database settings.

Create a `.env` file in the project root using `.env.example` as a reference.

### Environment Variables

```env
PORT=3000

JWT_SECRET=

JWT_REFRESH_SECRET=

DATABASE_URL=
```

| Variable | Purpose |
|----------|---------|
| `PORT` | Port on which the application runs |
| `JWT_SECRET` | Secret used for access-token operations |
| `JWT_REFRESH_SECRET` | Secret used for refresh-token operations |
| `DATABASE_URL` | PostgreSQL database connection string |

> **Important:** Never commit the `.env` file or expose JWT secrets,
> database credentials, or other sensitive configuration values.

The `.env.example` file contains the required variable names without
storing actual secret values.

## Local Development

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- PostgreSQL

### Setup

Clone the repository:

```bash
git clone https://github.com/Goushik-Raja-R/Authentication-Service.git
cd Authentication-Service
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Configure the required environment variables in `.env`:

```env
PORT=3000
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
DATABASE_URL=your_postgresql_connection_string
```

### Run in Development

Start the application with the development server:

```bash
npm run dev
```

The development server uses `tsx` watch mode and automatically
restarts when source files are changed.

### Build for Production

Compile the TypeScript application:

```bash
npm run build
```

Start the compiled application:

```bash
npm start
```

### Health Check

Once the application is running, verify the service using:

```text
GET /health
```

## Docker

The application is containerized using Docker to provide a consistent
runtime environment across development and deployment.

### Dockerfile

The `Dockerfile` defines the image used to package the Node.js
application and its runtime dependencies.

### Docker Compose

The `compose.yaml` file is used to define and run the containerized
application and its supporting services.

### Container Flow

```text
Source Code
    │
    ▼
Dockerfile
    │
    ▼
Docker Image
    │
    ▼
Docker Container
    │
    ▼
Node.js / Express Application
```

### Docker Workflow

```text
Build
  │
  ▼
Docker Image
  │
  ▼
Run Container
  │
  ▼
Express API
  │
  ▼
PostgreSQL
```

Docker provides an isolated and reproducible environment for running
the application and helps maintain consistency between development
and deployment environments.

## Nginx & AWS EC2 Deployment

The application is deployed on an AWS EC2 instance and exposed through
Nginx as a reverse proxy.

### Deployment Architecture

```text
                    Internet
                       │
                       ▼
                   AWS EC2
                       │
                       ▼
                     Nginx
                Reverse Proxy
                       │
                       ▼
              Docker Container
                       │
                       ▼
             Node.js / Express
                       │
                       ▼
                  PostgreSQL
```

### Nginx Reverse Proxy

Nginx acts as the public-facing reverse proxy for the application.

Incoming HTTP requests are received by Nginx and forwarded to the
Node.js / Express application running inside the Docker container.

```text
Client
  │
  │ HTTP Request
  ▼
Nginx
  │
  │ Proxy Request
  ▼
Node.js / Express
  │
  ▼
Application Logic
```

### AWS EC2

The application runs on an AWS EC2 instance.

The EC2 instance provides the compute environment for the deployed
containerized backend service.

The deployment combines:

- AWS EC2 for compute
- Docker for application containerization
- Nginx for reverse proxying
- Node.js and Express.js for the backend API
- PostgreSQL for persistent data

## Engineering Challenges & Solutions

Building the authentication service involved solving several practical
backend engineering problems.

### Refresh Token Management

**Challenge:**  
Access tokens are short-lived, so the system needed a secure mechanism
to maintain authenticated sessions without requiring users to log in
again frequently.

**Solution:**  
Implemented refresh tokens with server-side persistence and validation.
The refresh flow verifies the token, checks its database record,
expiration, and revocation state before issuing a new access token.

### Refresh Token Rotation

**Challenge:**  
Reusing the same refresh token indefinitely increases the impact of
token compromise.

**Solution:**  
Implemented refresh token rotation so that a refresh operation replaces
the existing refresh token with a new one.

### Session Invalidation

**Challenge:**  
JWT-based authentication needs a mechanism to invalidate sessions when
a user logs out.

**Solution:**  
Implemented individual logout and logout-all functionality by managing
refresh-token state on the server.

### Role-Based Access Control

**Challenge:**  
Authentication confirms who the user is, but protected operations may
also require permission checks.

**Solution:**  
Implemented authorization middleware that evaluates the authenticated
user's role before allowing access to protected operations.

### Rate Limiting

**Challenge:**  
Authentication endpoints can be targeted with excessive requests and
credential attacks.

**Solution:**  
Added rate limiting to relevant authentication endpoints to control
request frequency and reduce abuse.

### Production Deployment

**Challenge:**  
The application needed to run consistently outside the local
development environment.

**Solution:**  
Containerized the application with Docker and deployed it on AWS EC2,
with Nginx acting as a reverse proxy.

## Future Improvements

The project can be extended further with additional production-oriented
features and improvements.

Planned improvements include:

- Automated CI/CD deployment pipeline
- Automated test coverage
- API documentation with OpenAPI / Swagger
- Improved observability and structured logging
- Enhanced session and token management
- Security hardening and additional authentication controls
- Improved monitoring and health checks
