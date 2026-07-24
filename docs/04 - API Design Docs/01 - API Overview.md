
> [!info]
> **Project:** Authentication Service  
> **Section:** API Design  
> **Document Type:** API Architecture  
> **Objective:** Define API standards, conventions, and communication patterns.

---

# 📖 Overview

API (Application Programming Interface) allows different applications to communicate with each other.

In our Authentication Service:

```
Client Application

        ↓

Authentication API

        ↓

Backend Service

        ↓

Database
```

The API acts as a communication layer between users and backend logic.

---

# API Design Goals

Our API should be:

- Simple to understand.
- Secure.
- Consistent.
- Scalable.
- Easy to maintain.

---

# API Architecture

Our API follows:

```
REST API Architecture
```

---

# What is REST?

REST (Representational State Transfer) is an architectural style for designing web APIs.

REST uses:

- HTTP methods.
- Resources.
- Status codes.
- JSON communication.

---

# REST Request Structure

A client sends:

```
HTTP Request

↓

Backend API

↓

HTTP Response
```

---

# Example Request

```http
POST /api/auth/login
```

Request Body:

```json
{
 "email":"john@gmail.com",
 "password":"Password@123"
}
```

---

Response:

```json
{
 "message":"Login successful",
 "accessToken":"jwt_token"
}
```

---

# API Base URL

All APIs follow a common base path.

Example:

```
/api/v1
```

---

Complete endpoint:

```
/api/v1/auth/login
```

---

# Why Version APIs?

API versioning helps when APIs change.

Example:

Current:

```
/api/v1/auth/login
```

Future:

```
/api/v2/auth/login
```

Old clients can continue working.

---

# HTTP Methods Used

Our Authentication Service uses:

| Method | Purpose |
|-|-|
| POST | Create data / perform actions |
| GET | Retrieve data |
| PUT | Update complete data |
| PATCH | Partial update |
| DELETE | Remove data |

---

# Authentication API Endpoints

The service contains:

| Feature | Method | Endpoint |
|-|-|-|
| Register | POST | /api/v1/auth/register |
| Login | POST | /api/v1/auth/login |
| Refresh Token | POST | /api/v1/auth/refresh |
| Logout | POST | /api/v1/auth/logout |

---

# User API Endpoints

Protected resources:

| Feature | Method | Endpoint |
|-|-|-|
| Get Profile | GET | /api/v1/users/profile |
| Update Profile | PATCH | /api/v1/users/profile |

---

# Request Format

All requests use JSON.

Example:

```json
{
"name":"John",
"email":"john@gmail.com",
"password":"Password@123"
}
```

---

# Response Format

All APIs follow a consistent response structure.

Success:

```json
{
"success":true,
"message":"Operation completed",
"data":{}
}
```

---

Error:

```json
{
"success":false,
"message":"Something went wrong",
"errorCode":"AUTH_ERROR"
}
```

---

# HTTP Status Codes

We use standard HTTP responses.

---

## 200 OK

Request successful.

Example:

```
Profile fetched successfully
```

---

## 201 Created

Resource created.

Example:

```
User registration successful
```

---

## 400 Bad Request

Invalid input.

Example:

```
Email format incorrect
```

---

## 401 Unauthorized

Authentication failed.

Example:

```
Invalid credentials
```

---

## 403 Forbidden

Permission denied.

Example:

```
User cannot access admin route
```

---

## 404 Not Found

Resource does not exist.

Example:

```
User not found
```

---

## 500 Internal Server Error

Unexpected server error.

Example:

```
Database failure
```

---

# Authentication Header

Protected APIs require JWT.

Request:

```http
GET /api/v1/users/profile
```

Header:

```http
Authorization: Bearer access_token
```

---

# API Security Rules

## 1. Validate Input

Every request must be validated.

Example:

```
Email

Password

Role
```

---

## 2. Never Return Sensitive Data

Never return:

```json
{
"password_hash":"..."
}
```

---

## 3. Secure Authentication

Use:

- JWT
- Refresh Tokens
- Secure Cookies

---

# API Request Lifecycle

Example:

```
Client Request

↓

Route

↓

Middleware

↓

Controller

↓

Service

↓

Repository

↓

Database

↓

Response
```

---

# API Documentation Tools

We will use:

## Swagger

Purpose:

- Document APIs.
- Test endpoints.
- Share API contract.

---

## Postman

Purpose:

- Send API requests.
- Test responses.
- Debug APIs.

---

# API Design Principles

## Resource Based URLs

Good:

```
/users/profile
```

Bad:

```
/getUserProfileData
```

---

## Use HTTP Methods Correctly

Good:

```
DELETE /users/123
```

Bad:

```
POST /deleteUser
```

---

## Keep Responses Consistent

All APIs should return the same format.

---

# 📝 Summary

API Design defines how clients communicate with the Authentication Service.

Our API follows:

```
REST Architecture

+

JSON Communication

+

JWT Authentication

+

Standard HTTP Responses
```

Before implementation, every endpoint will be designed and documented.

---

# 🧠 Key Takeaways

- API is a communication contract.
- REST uses HTTP methods and resources.
- Version APIs for future changes.
- Use proper status codes.
- Keep request/response formats consistent.
- Design APIs before writing controllers.

---

# 🔗 Related Notes

- [[02 - Register API]]
- [[03 - Login API]]
- [[04 - Refresh Token API]]
- [[05 - Logout API]]
- [[06 - Protected Routes API]]