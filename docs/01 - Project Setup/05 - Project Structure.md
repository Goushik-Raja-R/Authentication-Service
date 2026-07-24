

> [!info]
> **Project:** Authentication Service
> **Phase:** Project Setup
> **Architecture:** Layered Architecture
> **Objective:** Understand how the project is organized and why each folder exists.

---

# 📖 Overview

A well-structured project is easier to understand, maintain, test, and scale.

Instead of placing all code inside a single file, backend applications organize responsibilities into separate folders.

This separation follows the **Single Responsibility Principle (SRP)**, where each folder has one clear purpose.

Our Authentication Service follows a **Layered Architecture**, which is widely used in production backend applications.

---

# 🎯 Learning Objectives

After completing this note, you should understand:

- Why folder structure matters.
- How our Authentication Service is organized.
- The responsibility of each folder.
- How requests flow through the project.

---

# 🏗️ Final Project Structure

```text
Authentication-Service/

docs/
src/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
├── validations/
│
├── app.ts
└── server.ts

package.json
tsconfig.json
README.md
```

---

# 📂 Folder Responsibilities

## config/

Stores application configuration.

Examples:

- Database connection
- Environment variables
- JWT configuration

---

## controllers/

Receives HTTP requests.

Responsibilities:

- Read request data.
- Call services.
- Return responses.

Controllers should **not** contain business logic.

---

## services/

Contains business logic.

Examples:

- Register user
- Login user
- Generate JWT
- Verify password

Services are the brain of the application.

---

## repositories/

Communicates with the database.

Responsibilities:

- Read data.
- Insert data.
- Update data.
- Delete data.

This layer hides database implementation details from the rest of the application.

---

## models/

Defines MongoDB schemas.

Examples:

- User
- Refresh Token

---

## routes/

Maps HTTP endpoints to controllers.

Example:

```text
POST /login
      │
      ▼
AuthController.login()
```

---

## middlewares/

Reusable logic executed before reaching controllers.

Examples:

- Authentication
- Authorization
- Logging
- Validation

---

## validations/

Contains request validation logic.

Examples:

- Email validation
- Password validation
- Input sanitization

---

## utils/

Reusable helper functions.

Examples:

- JWT utilities
- Password hashing
- Date helpers

---

## app.ts

Creates and configures the Express application.

Responsibilities:

- Register middleware.
- Register routes.
- Configure application settings.

---

## server.ts

Application entry point.

Responsibilities:

- Start the server.
- Listen on a port.
- Handle server startup.

---

# 🔄 Request Flow

```text
Client
   │
   ▼
Routes
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
MongoDB
   │
   ▼
Repositories
   │
   ▼
Services
   │
   ▼
Controllers
   │
   ▼
Client
```

---

# 🏗️ Real-Life Example

Imagine ordering food online.

```text
Customer
     │
     ▼
Reception
     │
     ▼
Chef
     │
     ▼
Store Room
     │
     ▼
Ingredients
```

Similarly,

```text
Client
     │
     ▼
Route
     │
     ▼
Controller
     │
     ▼
Service
     │
     ▼
Repository
     │
     ▼
Database
```

Each layer has one responsibility.

---

# 💼 Project Context

As our Authentication Service grows, we'll add:

- Registration
- Login
- Refresh Tokens
- Password Reset
- Role-Based Access Control

Because of this folder structure, adding new features will not make the project messy.

---

# ✅ Advantages

- Easy to understand.
- Easy to test.
- Easy to scale.
- Better code organization.
- Clear separation of responsibilities.

---

# ❌ Common Mistakes

### Putting everything in server.ts

Works for small demos.

Fails for production applications.

---

### Writing database queries inside controllers

Database logic belongs inside repositories.

---

### Writing business logic inside routes

Routes should only map URLs to controllers.

---

# 🏭 Production Perspective

Large companies organize backend projects using layered architectures because:

- Teams can work independently.
- Testing becomes easier.
- Code is reusable.
- New features can be added without affecting existing modules.

The exact folder names may vary, but the idea of separating responsibilities is common across production systems.

---

# 🎤 Interview Questions

## Q1. Why do backend projects use folder structures?

To separate responsibilities, improve maintainability, and make the project easier to scale.

---

## Q2. What is the responsibility of a controller?

To receive requests, call the appropriate service, and return a response.

---

## Q3. Where should business logic be written?

Inside the service layer.

---

## Q4. Why do we use repositories?

To isolate database operations from business logic.

---

# 📝 Summary

- Every folder has a single responsibility.
- Our Authentication Service follows a layered architecture.
- Separating responsibilities makes the project easier to maintain and scale.

---

# 📚 References

- Express Documentation
- Node.js Best Practices

---

# 🔗 Related Notes

- [[04 - Express Setup]]
- [[06 - Package.json Scripts]]
- [[Layered Architecture]]