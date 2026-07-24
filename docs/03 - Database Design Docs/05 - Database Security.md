

> [!info]
> **Project:** Authentication Service  
> **Section:** Database Design  
> **Document Type:** Security Design  
> **Objective:** Understand how authentication data is protected inside the database.

---

# 📖 Overview

Database security is the practice of protecting stored data from:

- Unauthorized access.
- Data leaks.
- Data modification.
- Security attacks.

For an authentication system, database security is extremely important because it stores user identity information.

---

# Security Goals

Our database security focuses on:

```
Confidentiality

+

Integrity

+

Availability
```

---

# 1. Password Security

## Important Rule

Never store plain passwords.

---

## Wrong Approach

Database:

```json
{
"name":"John",
"password":"password123"
}
```

Problem:

If database leaks:

```
Attacker gets all passwords
```

---

## Correct Approach

Store password hash:

```json
{
"name":"John",
"password_hash":"$2b$10$8hd73..."
}
```

---

# Hashing

Hashing converts a password into a fixed-length string.

Example:

```
password123

↓

bcrypt

↓

$2b$10$8hd73...
```

---

Important property:

Hashing is:

```
One Way Process
```

Meaning:

```
Password

↓

Hash
```

But:

```
Hash

↓

Password

(X)
```

is not possible.

---

# Why Use bcrypt?

bcrypt provides:

- Strong password hashing.
- Salt generation.
- Protection against brute-force attacks.

---

Password Flow:

## Registration

```
User Password

↓

bcrypt Hash

↓

Store Hash
```

---

## Login

```
User Password

↓

bcrypt Compare

↓

Stored Hash

↓

Authentication Result
```

---

# 2. Refresh Token Security

Refresh tokens are sensitive.

They allow generating new access tokens.

If stolen:

```
Attacker

↓

Refresh Token

↓

New Access Token

↓

Account Access
```

---

# Token Storage

Avoid storing:

```
Plain Refresh Token
```

---

Better:

```
Refresh Token

↓

Hash Token

↓

Store Hash
```

---

Example:

Database:

```json
{
"token":
"hashed_refresh_token"
}
```

---

# 3. Data Validation

Database should not accept invalid data.

Examples:

Email:

Wrong:

```
abc
```

Correct:

```
user@gmail.com
```

---

Password:

Should follow:

- Minimum length.
- Complexity rules.

---

# 4. Unique Constraints

Some data must be unique.

Example:

Email.

---

Wrong:

```
User 1

john@gmail.com


User 2

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

Database should enforce:

```
email: UNIQUE
```

---

# 5. Environment Variables

Sensitive database information should not be stored in code.

---

Wrong:

```javascript
mongoose.connect(
"mongodb://admin:password123@localhost"
)
```

---

Problem:

Anyone viewing code can access database.

---

Correct:

.env

```
DATABASE_URL=mongodb://localhost/auth
```

---

Application:

```
Environment Variable

↓

Database Connection
```

---

# 6. Database Access Control

Production databases should have:

- Authentication.
- User permissions.
- Restricted access.

---

Example:

Application user:

Allowed:

```
READ

WRITE
```

Not allowed:

```
Database Administration
```

---

# 7. Database Index Security

Indexes improve performance.

Example:

Email search:

```
Find user by email
```

requires:

```
Email Index
```

---

Benefits:

- Faster lookup.
- Reduced database load.

---

# 8. Avoid Sensitive Data Exposure

Never return:

```json
{
"name":"John",
"email":"john@gmail.com",
"password_hash":"$2b$10..."
}
```

---

API response should contain:

```json
{
"name":"John",
"email":"john@gmail.com"
}
```

---

# 9. Backup Strategy

Production systems require backups.

Purpose:

Protect against:

- Data loss.
- Accidental deletion.
- System failure.

---

Backup types:

```
Automatic Backup

+

Manual Backup
```

---

# 10. Database Monitoring

Monitor:

- Failed connections.
- Unusual queries.
- Performance issues.
- Security events.

---

# Authentication Database Security Flow

```text
User

↓

API Request

↓

Validation

↓

Service Layer

↓

Repository

↓

Database

↓

Protected Data
```

---

# Security Checklist

## Password

- [x] Hash passwords
- [x] Never store plain text
- [x] Use bcrypt

---

## Tokens

- [x] Secure storage
- [x] Expiry handling
- [x] Revocation support

---

## Database

- [x] Environment variables
- [x] Access control
- [x] Backups
- [x] Monitoring

---

## API

- [x] Validate input
- [x] Hide sensitive fields
- [x] Handle errors securely

---

# Real-Life Example

Bank System:

The bank does not store:

```
ATM PIN = 1234
```

Instead:

```
PIN

↓

Secure Hash

↓

Database
```

Authentication systems follow the same principle.

---

# 📝 Summary

Database security protects authentication data from unauthorized access and attacks.

Our Authentication Service follows:

```
Secure Storage

+

Data Validation

+

Access Control

+

Sensitive Data Protection
```

The database stores only what is required and protects confidential information.

---

# 🧠 Key Takeaways

- Never store plain passwords.
- Hash passwords using bcrypt.
- Protect refresh tokens.
- Use environment variables.
- Validate stored data.
- Apply access control.
- Avoid exposing sensitive fields.
- Backup important data.

---

# 🔗 Related Notes

- [[01 - Database Overview]]
- [[02 - User Entity Design]]
- [[03 - Refresh Token Design]]
- [[04 - Database Relationships]]
- [[JWT]]
- [[Password Hashing]]