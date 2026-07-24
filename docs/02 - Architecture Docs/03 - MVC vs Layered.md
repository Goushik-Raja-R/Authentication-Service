

> [!info]
> **Project:** Authentication Service  
> **Section:** Architecture  
> **Document Type:** Architecture Comparison  
> **Objective:** Understand the difference between MVC and Layered Architecture and why we use layered architecture.

---

# 📖 Overview

MVC (Model-View-Controller) and Layered Architecture are two common software architecture patterns.

Both help organize code by separating responsibilities.

However, they solve different problems.

---

# What is MVC?

## MVC Definition

MVC stands for:

```
Model

View

Controller
```

It separates an application into three main components.

---

# MVC Structure

```text
        Client

          ↓

     Controller

      ↙      ↘

 Model       View
```

---

# MVC Components

## 1. Model

### Responsibility

Handles data and database-related operations.

Examples:

- User model.
- Product model.
- Order model.

Example:

```
User Model

↓

Database
```

---

## 2. View

### Responsibility

Handles user interface presentation.

Examples:

- HTML pages.
- Templates.
- UI rendering.

Example:

```
Model Data

↓

View

↓

User Interface
```

---

## 3. Controller

### Responsibility

Acts as a bridge between Model and View.

Handles:

- User requests.
- Application flow.
- Response generation.

---

# MVC Request Flow

Example:

User Login:

```
User

↓

Controller

↓

Model

↓

Database

↓

Controller

↓

View

↓

User
```

---

# Where is MVC Commonly Used?

MVC is widely used in:

- Web applications.
- Server-side rendered applications.

Examples:

- Django.
- Ruby on Rails.
- Laravel.
- ASP.NET MVC.

---

# Problem with MVC in Large Backend Systems

In small applications:

```
Controller

↓

Model

↓

Database
```

works fine.

But in large applications:

Controllers become overloaded.

Example:

```javascript
LoginController(){

validate input

check user

hash password

compare password

generate token

save database

send email

send response

}
```

Problems:

- Difficult to maintain.
- Difficult to test.
- Business logic mixed with HTTP logic.

---

# What is Layered Architecture?

Layered Architecture separates the application into multiple layers.

Our Authentication Service follows this pattern.

---

# Layered Architecture Structure

```text
Client

↓

API Layer

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
```

---

# Layer Responsibilities

## Controller Layer

Handles:

- HTTP requests.
- HTTP responses.

Does not contain business logic.

---

## Service Layer

Handles:

- Business rules.
- Authentication logic.
- Application decisions.

Example:

```
Validate User

↓

Hash Password

↓

Generate Token
```

---

## Repository Layer

Handles:

- Database communication.

Example:

```
Find User

Save User

Update User
```

---

# Layered Architecture Request Flow

Example:

Login:

```
Client

↓

Controller

↓

Service

↓

Repository

↓

Database
```

---

# MVC vs Layered Architecture Comparison

| Feature | MVC | Layered Architecture |
|-|-|-|
| Main Goal | Separate UI, data, controller | Separate application responsibilities |
| Layers | 3 components | Multiple layers |
| Focus | Presentation structure | Backend organization |
| Common Use | Web applications | Enterprise backend systems |
| Business Logic | Often inside Model/Controller | Dedicated Service Layer |
| Database Access | Model | Repository |
| Testing | Moderate | Easier |
| Scalability | Limited | Better |

---

# Can MVC and Layered Architecture Work Together?

Yes.

They are not competitors.

They solve different problems.

Example:

A backend application can have:

```
Presentation Layer

        ↓

Controller

        ↓

Service Layer

        ↓

Repository Layer

        ↓

Database
```

Here:

- Controller comes from MVC.
- Service and Repository come from layered architecture.

---

# Our Authentication Service Architecture

We are using:

```
Layered Architecture

+

MVC Controller Pattern
```

Structure:

```
Client

↓

Routes

↓

Controller

↓

Service

↓

Repository

↓

Database
```

---

# Why We Choose Layered Architecture?

## 1. Authentication Has Complex Logic

Authentication contains:

- Password hashing.
- JWT generation.
- Refresh tokens.
- Role checking.

This logic should not live inside controllers.

---

## 2. Better Separation

Example:

Controller:

```
Receive login request
```

Service:

```
Validate credentials
Generate tokens
```

Repository:

```
Find user from database
```

---

## 3. Easier Testing

We can test:

```
Auth Service

without

Express Server
```

---

## 4. Easier Scaling

Future features:

- OAuth login.
- Email verification.
- Multi-factor authentication.

Can be added without breaking existing code.

---

# Real-Life Example

## MVC

Restaurant:

```
Customer

↓

Waiter

↓

Chef
```

Simple.

---

## Layered Architecture

Large Hotel:

```
Customer

↓

Reception

↓

Manager

↓

Department Heads

↓

Employees

↓

Storage
```

Each department has a responsibility.

---

# Our Project Mapping

```
src/

├── routes

        ↓

├── controllers

        ↓

├── services

        ↓

├── repositories

        ↓

├── models

        ↓

└── database
```

---

# 📝 Summary

MVC focuses on separating application presentation into Model, View, and Controller.

Layered Architecture focuses on separating backend responsibilities into different layers.

For our Authentication Service, we use:

```
Layered Architecture

with

MVC-style Controllers
```

because authentication contains complex business logic that requires better separation.

---

# 🧠 Key Takeaways

- MVC and Layered Architecture are different concepts.
- MVC focuses on presentation separation.
- Layered Architecture focuses on responsibility separation.
- Controllers should not contain business logic.
- Services contain application logic.
- Repositories handle database communication.
- Modern backend systems commonly combine both approaches.

---

# 🔗 Related Notes

- [[01 - Layered Architecture]]
- [[02 - Request Lifecycle]]
- [[04 - Dependency Flow]]
- [[05 - Error Flow]]