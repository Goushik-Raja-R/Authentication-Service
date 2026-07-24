

> [!info]
> **Project:** Authentication Service  
> **Section:** Database Design  
> **Document Type:** Entity Design  
> **Objective:** Define the structure and purpose of the User entity.

---

# 📖 Overview

The User entity represents a person who can access the Authentication Service.

It stores:

- User identity information.
- Login credentials.
- Authorization information.
- Account metadata.

---

# User Entity Responsibility

The User entity is responsible for:

- Identifying users.
- Storing authentication details.
- Maintaining user roles.
- Tracking account information.

---

# User Entity Structure

```text
User

|
|-- id
|-- name
|-- email
|-- password_hash
|-- role
|-- created_at
|-- updated_at
```

---

# Entity Design

| Field | Type | Purpose | Example |
|-|-|-|-|
| id | ObjectId | Unique user identifier | 65abc123 |
| name | String | User's display name | John |
| email | String | Login identifier | john@gmail.com |
| password_hash | String | Encrypted password | $2b$10... |
| role | String | User permission level | USER |
| created_at | Date | Account creation time | 2026-07-24 |
| updated_at | Date | Last update time | 2026-07-24 |

---

# Field Explanation

---

# 1. ID

## Purpose

Every user needs a unique identifier.

Example:

```
User A

id: 101


User B

id: 102
```

---

MongoDB automatically creates:

```
_id
```

Example:

```json
{
"_id":"65abc123"
}
```

---

# 2. Name

## Purpose

Stores the user's display name.

Example:

```json
{
"name":"John"
}
```

---

Requirements:

- Required field.
- Should contain valid characters.
- Length validation.

---

# 3. Email

## Purpose

Email acts as the user's login identity.

Example:

```json
{
"email":"john@gmail.com"
}
```

---

Requirements:

- Required.
- Unique.
- Valid email format.

---

Example:

Allowed:

```
john@gmail.com
```

Not allowed:

```
john@abc
```

---

## Why Unique Email?

Because two users cannot share the same login identity.

Example:

Wrong:

```
User 1

email:
john@gmail.com


User 2

email:
john@gmail.com
```

---

Correct:

```
User 1

john@gmail.com


User 2

alex@gmail.com
```

---

# 4. Password Hash

## Purpose

Stores the encrypted version of the password.

---

Important Rule:

Never store plain passwords.

---

Wrong:

```json
{
"password":"password123"
}
```

---

Correct:

```json
{
"password_hash":"$2b$10$8hd73..."
}
```

---

## Password Flow

Registration:

```
User Password

↓

bcrypt Hashing

↓

Store Hash
```

---

Login:

```
User Password

↓

bcrypt Compare

↓

Authentication Success
```

---

# 5. Role

## Purpose

Defines what actions a user can perform.

Used for:

```
RBAC
(Role Based Access Control)
```

---

Example roles:

```
ADMIN

USER

MANAGER
```

---

Example:

Admin:

```
Create users

Delete users

Manage system
```

---

User:

```
View own profile
```

---

# Role Storage

Example:

```json
{
"role":"USER"
}
```

---

# 6. Created At

## Purpose

Stores when the account was created.

Example:

```
created_at:

2026-07-24 10:00:00
```

---

Used for:

- Auditing.
- User history.
- Analytics.

---

# 7. Updated At

## Purpose

Stores the last modification time.

Example:

```
updated_at:

2026-07-25 12:00:00
```

---

Updated when:

- Profile changes.
- Password changes.
- Role changes.

---

# User Entity Example

MongoDB Document:

```json
{
 "_id":"65abc123",
 "name":"John",
 "email":"john@gmail.com",
 "password_hash":"$2b$10$xyz",
 "role":"USER",
 "created_at":"2026-07-24",
 "updated_at":"2026-07-24"
}
```

---

# User Registration Data Flow

```
Client

↓

Register API

↓

Validate Input

↓

Hash Password

↓

Create User Object

↓

Save User

↓

MongoDB
```

---

# User Login Data Flow

```
Client

↓

Login API

↓

Find User By Email

↓

Compare Password Hash

↓

Generate JWT

↓

Return Token
```

---

# User Entity Validation Rules

## Name

Rules:

- Required.
- Minimum length.
- Maximum length.

---

## Email

Rules:

- Required.
- Valid format.
- Unique.

---

## Password

Rules:

- Minimum length.
- Strong password.
- Never stored directly.

---

## Role

Rules:

Allowed values:

```
ADMIN

USER

MANAGER
```

---

# Database Indexing

## Email Index

Email should have an index.

Why?

Login searches by email:

```
Find user where email = ?
```

---

Without index:

```
Check every user
```

---

With index:

```
Direct lookup
```

---

# Security Considerations

User collection should protect:

- Password hashes.
- Personal information.
- Authentication data.

---

Never return:

```json
{
"password_hash":"..."
}
```

in API responses.

---

# Future Improvements

Possible additions:

```
profile_image

phone_number

last_login

is_verified

two_factor_enabled

```

---

# Mongoose Model Mapping

Future implementation:

```
src/

models/

└── User.ts
```

Example:

```text
User Model

↓

User Collection

↓

MongoDB
```

---

# 📝 Summary

The User entity is the foundation of the Authentication Service.

It stores user identity, authentication data, and authorization information.

The design ensures:

- Secure password storage.
- Unique user identification.
- Role-based access control.
- Future scalability.

---

# 🧠 Key Takeaways

- User entity represents application users.
- Email identifies users during login.
- Passwords are stored as hashes.
- Roles enable authorization.
- Timestamps support auditing.
- Database design should consider security.

---

# 🔗 Related Notes

- [[01 - Database Overview]]
- [[03 - Refresh Token Design]]
- [[04 - Database Relationships]]
- [[05 - Database Security]]
- [[01 - Layered Architecture]]