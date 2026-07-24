
> [!info]
> **Project:** Authentication Service
> **Phase:** Project Setup
> **Framework:** Express.js
> **Objective:** Set up Express.js as the web framework for building our Authentication Service APIs.

---

# 📖 Overview

Express.js is a lightweight and flexible web framework built on top of Node.js.

Node.js provides the runtime environment, while Express simplifies the process of building web servers and REST APIs.

In this Authentication Service project, Express will handle incoming HTTP requests, route them to the appropriate controllers, execute business logic, and send responses back to the client.

---

# 🎯 Learning Objectives

After completing this note, you should understand:

- What Express.js is.
- Why Express is used instead of the built-in Node.js HTTP module.
- How Express fits into our Authentication Service.
- Which packages we installed.
- How Express will be used throughout the project.

---

# 🤔 What is Express.js?

Express.js is a minimal and unopinionated web framework for Node.js.

It provides tools to:

- Create web servers.
- Build REST APIs.
- Handle routing.
- Process HTTP requests.
- Send HTTP responses.
- Use middleware.

Instead of writing low-level HTTP server code, Express provides a clean and developer-friendly API.

---

# ❓ Why Do We Need Express?

Node.js already provides an HTTP module.

Example:

```javascript
import http from "http";

const server = http.createServer((req, res) => {
    res.end("Hello");
});

server.listen(3000);
```

This works, but as applications grow, handling routes, middleware, validation, and error handling becomes difficult.

Express simplifies all of this.

Example:

```typescript
import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(3000);
```

Much cleaner and easier to maintain.

---

# 🏗️ Real-Life Example

Imagine opening a restaurant.

Without Express:

You cook, serve customers, clean tables, collect payments, and answer the phone yourself.

With Express:

You have trained staff handling each responsibility.

Express manages much of the repetitive work so you can focus on building business logic.

---

# 🏢 Why Did We Choose Express for This Project?

Our Authentication Service will contain:

- User Registration
- Login
- JWT Authentication
- Authorization
- Middleware
- Validation
- Error Handling
- Database Communication

Express provides an excellent foundation for implementing all of these features in a clean and modular way.

---

# 📦 Packages Installed

## Express

```bash
npm install express
```

Purpose:

Installs the Express framework.

---

## Express Type Definitions

```bash
npm install -D @types/express
```

Purpose:

Provides TypeScript support for Express.

This allows TypeScript to understand:

- Request
- Response
- Router
- Middleware

and other Express types.

---

# 📁 Current Project Structure

```text
Authentication-Service/

src/
│
└── server.ts

package.json
tsconfig.json
```

As the project grows:

```text
src/

controllers/
services/
repositories/
middlewares/
routes/
models/
utils/
config/

server.ts
```

---

# 🔄 Express Request Flow

```text
Client
   │
HTTP Request
   │
   ▼
Express Server
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
Database
   │
   ▼
Response
   │
   ▼
Client
```

This flow represents the high-level architecture we will build throughout the project.

---

# 💼 Project Context

Express acts as the entry point for every client request.

Whenever a client sends:

```http
POST /login
```

Express receives the request and forwards it through our application layers until a response is generated.

Without Express, we would have to manually implement much of this request-handling logic.

---

# ✅ Advantages of Express

- Lightweight
- Easy to learn
- Large ecosystem
- Huge community support
- Excellent middleware system
- Perfect for REST APIs
- Highly customizable

---

# ❌ Common Misconceptions

### "Express replaces Node.js."

Incorrect.

Express runs **on top of** Node.js.

Node.js provides the runtime.

Express provides the web framework.

---

### "Express is a backend language."

Incorrect.

Express is a JavaScript/TypeScript framework.

---

### "Node.js and Express are the same."

Incorrect.

Node.js executes JavaScript.

Express helps build web applications.

---

# ✅ Best Practices

- Keep Express focused on HTTP handling.
- Move business logic into services.
- Keep routes clean.
- Use middleware for reusable functionality.
- Organize the project using a layered architecture.

---

# ❌ Common Mistakes

### Writing all code inside server.ts

As projects grow, split responsibilities into controllers, services, repositories, and routes.

---

### Mixing database logic inside routes

Routes should only handle HTTP requests.

Business logic belongs inside services.

---

### Ignoring middleware

Middleware keeps code reusable and organized.

---

# 🎤 Interview Questions

## Q1. What is Express.js?

Express is a lightweight web framework built on top of Node.js for building web servers and REST APIs.

---

## Q2. Why use Express instead of Node's HTTP module?

Express simplifies routing, middleware, request handling, response handling, and application organization.

---

## Q3. Does Express replace Node.js?

No.

Express depends on Node.js.

Node.js provides the runtime environment.

---

## Q4. Why do we install @types/express?

Because Express is written in JavaScript.

The package provides TypeScript type definitions for Express APIs.

---

# 📝 Summary

- Express is a web framework built on top of Node.js.
- It simplifies building REST APIs.
- It provides routing, middleware, and request/response handling.
- Our Authentication Service uses Express as the primary web framework.

---

# 📚 References

- https://expressjs.com/
- https://nodejs.org/

---

# 🔗 Related Notes

- [[01 - Project Initialization]]
- [[02 - TypeScript Setup]]
- [[03 - tsconfig.json]]
- [[05 - Project Structure]]
- [[06 - Package.json Scripts]]