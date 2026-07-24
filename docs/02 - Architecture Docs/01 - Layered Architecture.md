

> [!info]
> **Project:** Authentication Service  
> **Section:** Architecture  
> **Document Type:** Architecture Pattern  
> **Objective:** Understand the layered architecture used in the backend system.

---

# 📖 Overview

The Authentication Service follows a **Layered Architecture** pattern.

Layered architecture separates the application into multiple layers where each layer has a specific responsibility.

The main goal is:

- Separation of concerns.
- Clean code organization.
- Easier testing.
- Better scalability.
- Easier maintenance.

---

# 🏗️ Architecture Overview

The Authentication Service contains the following layers:

```text
Client

↓

API Layer

↓

Middleware Layer

↓

Controller Layer

↓

Service Layer

↓

Repository Layer

↓

Database Layer
```

---

# Why Separate Layers?

Without layers, all logic may exist in one place.

Example:

```text
authController.js

- Receive request
- Validate input
- Check database
- Hash password
- Generate JWT
- Send response
```

Problems:

- Hard to understand.
- Hard to test.
- Difficult to modify.
- Creates tightly coupled code.

---

With layered architecture:

```text
Controller

↓

Service

↓

Repository

↓

Database
```

Each layer has a clear responsibility.

---

# Layer 1: API Layer

## Responsibility

The API layer handles communication between the client and backend.

It manages:

- Routes.
- HTTP methods.
- Request mapping.

---

Example:

```
POST /api/auth/login
```

Request enters through the API layer.

---

Example Flow:

```
Client

↓

Express Route

↓

Controller
```

---

# Layer 2: Middleware Layer

## Responsibility

Middleware performs operations before the request reaches the controller.

---

Examples:

### Authentication Middleware

Checks:

```
Is JWT valid?
```

---

### Authorization Middleware

Checks:

```
Does user have permission?
```

---

### Validation Middleware

Checks:

```
Is request data correct?
```

---

Flow:

```text
Request

↓

Middleware

↓

Controller
```

---

# Layer 3: Controller Layer

## Responsibility

Controllers handle HTTP communication.

They are responsible for:

- Receiving requests.
- Extracting request data.
- Calling services.
- Returning responses.

---

Example:

```text
Login Request

↓

Auth Controller

↓

Auth Service

↓

Response
```

---

## Controller Should NOT Handle:

❌ Database queries

❌ Password hashing

❌ JWT creation

❌ Business rules

---

Example:

Wrong:

```javascript
loginController(){

check password

query database

generate token

send response

}
```

---

Correct:

```javascript
loginController(){

call authService()

return response

}
```

---

# Layer 4: Service Layer

## Responsibility

The service layer contains business logic.

It is the brain of the application.

---

Examples:

Registration Service:

```
Receive user data

↓

Check existing user

↓

Hash password

↓

Create user

```

---

Login Service:

```
Find user

↓

Verify password

↓

Generate JWT

↓

Create refresh token
```

---

The service layer does not know:

- HTTP requests.
- HTTP responses.

It only handles business operations.

---

# Layer 5: Repository Layer

## Responsibility

Repository handles communication with the database.

---

Examples:

User Repository:

```
createUser()

findUserByEmail()

updateUser()

deleteUser()
```

---

Flow:

```
Service

↓

Repository

↓

Database
```

---

Benefits:

If database changes:

```
MongoDB

↓

PostgreSQL
```

Only repository implementation changes.

Business logic remains the same.

---

# Layer 6: Database Layer

## Responsibility

Stores and manages application data.

Our database:

```
MongoDB
```

---

Stores:

```
Users

Refresh Tokens

Roles
```

---

# Complete Request Flow

Example:

User Login:

```
Client

↓

POST /login

↓

Express Route

↓

Auth Middleware

↓

Auth Controller

↓

Auth Service

↓

User Repository

↓

MongoDB

↓

Return User Data

↓

Generate JWT

↓

Response
```

---

# Dependency Rule

Dependencies should flow only downward.

Correct:

```
Controller

↓

Service

↓

Repository

↓

Database
```

---

Incorrect:

```
Repository

↓

Controller
```

Lower layers should not know about higher layers.

---

# Benefits of Layered Architecture

## 1. Maintainability

Code is easier to understand and modify.

---

## 2. Testability

Each layer can be tested separately.

Example:

Service testing without database.

---

## 3. Scalability

New features can be added without affecting the entire system.

---

## 4. Team Collaboration

Different developers can work on different layers.

Example:

Developer 1:

```
Controllers
```

Developer 2:

```
Services
```

Developer 3:

```
Repositories
```

---

# Real-Life Example

Restaurant Architecture:

| Backend Layer | Restaurant |
|-|-|
| Client | Customer |
| Controller | Waiter |
| Service | Chef |
| Repository | Store Manager |
| Database | Storage Room |

Customer communicates only with waiter.

Customer does not enter the kitchen.

---

# Project Folder Mapping

This architecture maps to:

```
src/

├── routes/

├── middleware/

├── controllers/

├── services/

├── repositories/

├── models/

├── utils/

└── server.ts
```

---

# 📝 Summary

Layered Architecture separates the Authentication Service into independent layers with specific responsibilities.

The request flows from the client through API, middleware, controller, service, repository, and database layers.

This design improves maintainability, scalability, testing, and code quality.

---

# 🧠 Key Takeaways

- Each layer has one responsibility.
- Controllers handle HTTP communication.
- Services contain business logic.
- Repositories handle database operations.
- Database stores application data.
- Lower layers should not depend on higher layers.
- Good architecture reduces complexity.

---

# 🔗 Related Notes

- [[02 - Request Lifecycle]]
- [[03 - MVC vs Layered]]
- [[04 - Dependency Flow]]
- [[05 - Error Flow]]
- [[07 - Architecture Overview]]