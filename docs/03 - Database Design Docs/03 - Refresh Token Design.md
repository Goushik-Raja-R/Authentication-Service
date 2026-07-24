

> [!info]
> **Project:** Authentication Service  
> **Section:** Database Design  
> **Document Type:** Entity Design  
> **Objective:** Understand refresh token storage, purpose, and lifecycle.

---

# 📖 Overview

A refresh token is a security mechanism used to maintain user sessions without forcing users to log in repeatedly.

Modern authentication systems commonly use:

```
Access Token

+

Refresh Token
```

---

# Why Do We Need Refresh Tokens?

JWT Access Tokens usually have a short lifetime.

Example:

```
Access Token Expiry:

15 minutes
```

Why?

Because if someone steals the token, the damage is limited.

---

Problem:

User logs in:

```
9:00 AM

↓

Access Token expires

↓

9:15 AM
```

Should the user login again?

Bad user experience.

---

Solution:

Use a refresh token.

```
Access Token Expired

↓

Use Refresh Token

↓

Generate New Access Token
```

---

# Authentication Token System

Our system uses:

```
Client

↓

Access Token

↓

API Access


Client

↓

Refresh Token

↓

Generate New Access Token
```

---

# Access Token vs Refresh Token

| Feature | Access Token | Refresh Token |
|-|-|-|
| Purpose | Access APIs | Generate new access tokens |
| Lifetime | Short | Long |
| Example | 15 minutes | 7 days |
| Sent With | API requests | Token refresh request |
| Stored | Client memory/cookie | Secure storage |
| Contains | User information | Token identifier |

---

# Refresh Token Entity

The Refresh Token entity stores active user sessions.

Structure:

```
RefreshToken

|

|-- id

|-- user_id

|-- token

|-- expires_at

|-- is_revoked

|-- created_at
```

---

# Entity Design

| Field | Type | Purpose |
|-|-|-|
| id | ObjectId | Unique identifier |
| user_id | ObjectId | Connected user |
| token | String | Refresh token value |
| expires_at | Date | Token expiry |
| is_revoked | Boolean | Token status |
| created_at | Date | Creation time |

---

# Field Explanation

---

# 1. ID

## Purpose

Unique identifier for each refresh token.

Example:

```
Refresh Token ID:

123456
```

---

# 2. User ID

## Purpose

Creates relationship between:

```
User

↓

Refresh Token
```

---

Example:

User:

```json
{
"id":"user123"
}
```

Refresh Token:

```json
{
"user_id":"user123"
}
```

---

# 3. Token

## Purpose

Stores the refresh token value.

Example:

```
eyJhbGciOiJIUzI1...
```

---

Security Note:

In production:

Instead of storing the raw token:

```
Refresh Token
```

store:

```
Hashed Refresh Token
```

similar to passwords.

---

# 4. Expiry Time

## Purpose

Defines when the refresh token becomes invalid.

Example:

```
Created:

July 24


Expires:

July 31
```

---

After expiry:

```
Refresh Request

↓

Rejected
```

---

# 5. Is Revoked

## Purpose

Allows manual invalidation of tokens.

Example:

User logs out.

Before:

```
is_revoked:

false
```

After logout:

```
is_revoked:

true
```

---

# 6. Created At

Stores token creation time.

Useful for:

- Auditing.
- Session tracking.
- Security monitoring.

---

# Refresh Token Lifecycle

---

# 1. User Login

Flow:

```
User

↓

Email + Password

↓

Authentication Success

↓

Generate Access Token

↓

Generate Refresh Token

↓

Store Refresh Token

↓

Return Tokens
```

---

# 2. Access Token Usage

Request:

```
GET /profile
```

Header:

```
Authorization: Bearer access_token
```

---

Server:

```
Verify Access Token

↓

Allow Request
```

---

# 3. Access Token Expiry

After expiry:

```
Access Token Invalid

↓

Client sends Refresh Token

↓

Server validates Refresh Token

↓

Generate New Access Token
```

---

# 4. Logout

Flow:

```
User Logout

↓

Find Refresh Token

↓

Mark Token Revoked

↓

Session Ends
```

---

# Database Relationship

Relationship:

```
One User

       |

       |

Many Refresh Tokens
```

---

Example:

User:

```
John
```

Sessions:

```
Laptop Login

Mobile Login

Tablet Login
```

---

Database:

```
Users

John


RefreshTokens

Token 1

Token 2

Token 3
```

---

# Why Store Refresh Tokens?

Without storing:

```
Generate Token

↓

Forget Token
```

Problems:

- Cannot logout.
- Cannot revoke sessions.
- Cannot track devices.

---

With storage:

```
Refresh Token Database

↓

Validate

↓

Revoke

↓

Monitor
```

---

# Security Rules

## Never expose refresh tokens unnecessarily

Avoid:

```
Response body
```

Prefer:

```
HTTP Only Secure Cookie
```

---

## Token Expiry

Always define expiry.

Example:

```
7 days
```

---

## Token Revocation

Support:

- Logout.
- Password reset.
- Security breach.

---

# Future Database Model

Structure:

```
src/

models/

├── User.ts

└── RefreshToken.ts
```

---

# Example Document

```json
{
 "_id":"token123",
 "user_id":"user123",
 "token":"hashed_token",
 "expires_at":"2026-07-31",
 "is_revoked":false,
 "created_at":"2026-07-24"
}
```

---

# 📝 Summary

Refresh tokens allow users to maintain secure sessions without frequent logins.

The Authentication Service uses:

```
Short-lived Access Token

+

Long-lived Refresh Token
```

Refresh tokens are stored to support:

- Session management.
- Logout.
- Token revocation.
- Security control.

---

# 🧠 Key Takeaways

- Access tokens should be short-lived.
- Refresh tokens create new access tokens.
- Refresh tokens need secure storage.
- Token revocation enables logout.
- One user can have multiple sessions.
- Refresh token management improves security.

---

# 🔗 Related Notes

- [[01 - Database Overview]]
- [[02 - User Entity Design]]
- [[04 - Database Relationships]]
- [[05 - Database Security]]
- [[JWT]]
- [[Cookies]]