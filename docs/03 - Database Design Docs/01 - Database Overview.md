
> [!info]
> **Project:** Authentication Service  
> **Section:** Database Design  
> **Document Type:** Database Architecture  
> **Objective:** Explain the database choice, purpose, and design approach.

---

# 📖 Overview

A database is responsible for storing and managing application data.

In the Authentication Service, the database stores:

- User information.
- Authentication data.
- Session information.
- Role information.

The database acts as the permanent storage layer of the application.

---

# Why Do We Need a Database?

Authentication requires storing user-related information.

Example:

When a user registers:

```
Name

Email

Password Hash

Role

Created Date
```

This information must be stored permanently.

---

Without a database:

```
Server Restart

↓

All users disappear
```

With a database:

```
Server Restart

↓

User data remains available
```

---

# Database Selection

## Primary Database

```
MongoDB
```

---

# What is MongoDB?

MongoDB is a NoSQL document-based database.

Instead of storing data in rows and columns, MongoDB stores data as documents.

Example:

```json
{
 "_id":"123",
 "name":"John",
 "email":"john@gmail.com",
 "role":"USER"
}
```

---

# Why MongoDB?

MongoDB is selected because:

## 1. Flexible Schema

Authentication requirements may evolve.

Example:

Initial User:

```text
name
email
password
```

Later:

```text
name
email
password
role
profileImage
lastLogin
```

MongoDB allows easy document changes.

---

## 2. Good Node.js Integration

MongoDB works well with Node.js applications.

Flow:

```
Node.js

↓

Mongoose

↓

MongoDB
```

---

## 3. Fast Development

For backend projects, MongoDB allows developers to quickly build and modify features.

---

# Database Layer Architecture

Our application follows:

```text
Application

↓

Repository Layer

↓

Mongoose ODM

↓

MongoDB Database
```

---

# What is Mongoose?

Mongoose is an ODM (Object Data Modeling) library.

It provides:

- Schema definition.
- Data validation.
- Database operations.

---

Example:

Without Mongoose:

```
Application

↓

MongoDB Query
```

With Mongoose:

```
Application

↓

Model

↓

MongoDB
```

---

# Database Responsibilities

The database is responsible for:

## Data Storage

Store:

```
Users

Refresh Tokens

Roles
```

---

## Data Retrieval

Example:

Find user during login:

```
Email

↓

Database Search

↓

User Data
```

---

## Data Integrity

Maintain:

- Unique emails.
- Required fields.
- Valid relationships.

---

# Authentication Data Flow

## Registration

```
User Input

↓

Validation

↓

Password Hashing

↓

Save User

↓

MongoDB
```

---

## Login

```
Email

↓

Find User

↓

Compare Password

↓

Generate Token
```

---

## Refresh Token

```
Refresh Token

↓

Validate Token

↓

Create New Access Token
```

---

# Database Entities

Our Authentication Service contains:

```
User

↓

Refresh Token
```

---

# Entity Overview

## User Entity

Stores:

- User identity.
- Login information.
- Role.

Example:

```
Users

id

name

email

password_hash

role

created_at

updated_at
```

---

## Refresh Token Entity

Stores:

- Active sessions.
- Token information.
- Expiry details.

Example:

```
RefreshTokens

id

user_id

token

expires_at

is_revoked
```

---

# Database Security Rules

The database should never store:

❌ Plain passwords

❌ Raw authentication secrets

❌ Sensitive information unnecessarily

---

Example:

Wrong:

```
password:

mypassword123
```

---

Correct:

```
password_hash:

$2b$10$8hd7....
```

---

# Environment Configuration

Database credentials should be stored securely.

Example:

```
.env

DATABASE_URL=mongodb://localhost:27017/auth-service
```

---

Never:

```
Hardcode database password in code
```

---

# Database Connection Flow

```
Application Starts

↓

Load Environment Variables

↓

Connect to MongoDB

↓

Start Express Server

↓

Accept Requests
```

---

# Future Database Improvements

Production systems may include:

- Database indexing.
- Replication.
- Backup strategy.
- Migration management.
- Monitoring.

---

# 📝 Summary

The Authentication Service uses MongoDB as the primary database.

MongoDB stores user information and authentication session data.

Mongoose acts as the bridge between Node.js and MongoDB.

Database access is controlled through the Repository Layer to maintain clean architecture.

---

# 🧠 Key Takeaways

- Database stores application state permanently.
- Authentication requires secure data storage.
- Passwords are stored as hashes.
- Database access should happen through repositories.
- MongoDB provides flexible document storage.
- Mongoose provides structured database interaction.

---

# 🔗 Related Notes

- [[02 - User Entity Design]]
- [[03 - Refresh Token Design]]
- [[04 - Database Relationships]]
- [[05 - Database Security]]
- [[01 - Layered Architecture]]