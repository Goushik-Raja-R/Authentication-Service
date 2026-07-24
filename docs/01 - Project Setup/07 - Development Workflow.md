

> [!info]
> **Project:** Authentication Service
> **Phase:** Project Setup
> **Objective:** Understand the complete development workflow from writing TypeScript code to running the application in production.

---

# 📖 Overview

Building a backend application is more than just writing code.

Every change you make follows a workflow before it becomes a running application.

Understanding this workflow helps you answer questions like:

- What happens after I save a file?
- Why does the server restart automatically?
- Why do we compile TypeScript?
- Why can't Node.js run `.ts` files directly?
- What is different between development and production?

This note connects everything we have configured so far into one complete picture.

---

# 🎯 Learning Objectives

After completing this note, you should understand:

- The complete lifecycle of our backend application.
- The difference between development and production.
- How TypeScript, tsx, Node.js, and npm scripts work together.
- The workflow we will follow throughout this project.

---

# 🏗️ The Complete Development Workflow

```text
Developer Writes Code
        │
        ▼
TypeScript (.ts)
        │
        ▼
Save File
        │
        ▼
tsx Watch Detects Changes
        │
        ▼
Server Automatically Restarts
        │
        ▼
Test API
        │
        ▼
Repeat Development
```

This is the workflow we'll use every day while building our Authentication Service.

---

# 🧩 Development Workflow Explained

## Step 1 - Write TypeScript Code

We write our application inside the `src` folder.

Example:

```text
src/
└── server.ts
```

At this stage, the code exists only as TypeScript.

---

## Step 2 - Save the File

Whenever we save a file:

```text
Ctrl + S
```

our work doesn't stop there.

The next tool takes over.

---

## Step 3 - tsx Watch Detects the Change

We start the development server using:

```bash
npm run dev
```

which executes:

```bash
tsx watch src/server.ts
```

`tsx` watches the project for file changes.

Whenever a file changes:

- Stops the current server.
- Starts it again automatically.

No manual restart is required.

---

## Step 4 - Test the API

Once the server restarts, we test our API using:

- Browser (for simple GET requests)
- Postman
- Thunder Client
- curl

Example:

```http
GET /
```

If everything works:

Continue developing.

If not:

Fix the issue and save again.

---

# 🚀 Production Workflow

Development is convenient because of `tsx`.

Production is different.

```text
TypeScript
      │
      ▼
npm run build
      │
      ▼
JavaScript
      │
      ▼
dist/
      │
      ▼
npm start
      │
      ▼
Node.js
```

Notice that **tsx is not involved** in production.

---

# 🔄 Complete Lifecycle

```text
Write Code
      │
      ▼
TypeScript (.ts)
      │
      ▼
Save
      │
      ▼
tsx Watch
      │
      ▼
Server Restart
      │
      ▼
Test API
      │
      ▼
Modify Code
      │
      ▼
Repeat...
```

When the project is ready for deployment:

```text
TypeScript
      │
      ▼
Build (tsc)
      │
      ▼
JavaScript
      │
      ▼
Node.js
      │
      ▼
Production Server
```

---

# 🏗️ Real-Life Example

Imagine you're writing a book.

### Development

You write a chapter.

Save it.

Read it.

Correct mistakes.

Save again.

Repeat.

This is similar to:

```text
Write
Save
Restart
Test
Repeat
```

---

### Production

Once the book is complete:

- Print it.
- Publish it.
- Readers only read the printed version.

They don't see your drafts.

Similarly:

Developers work with TypeScript.

Production servers run the compiled JavaScript.

---

# 💼 Project Context

Throughout this Authentication Service project:

### During development

We'll primarily use:

```bash
npm run dev
```

because it provides fast feedback through automatic restarts.

### Before deployment

We'll use:

```bash
npm run build
```

to generate the production-ready JavaScript files.

### In production

We'll run:

```bash
npm start
```

which executes the compiled application.

---

# 🏭 Production Perspective

In professional backend teams:

- Developers write TypeScript.
- CI/CD pipelines build the project.
- Servers run compiled JavaScript.
- Source TypeScript files are generally not executed directly in production.

This separation improves reliability and ensures the deployed code is exactly what was built and tested.

---

# 🖼️ Overall Project Workflow

```text
Initialize Project
        │
        ▼
Install TypeScript
        │
        ▼
Configure tsconfig.json
        │
        ▼
Install Express
        │
        ▼
Configure npm Scripts
        │
        ▼
Write Code
        │
        ▼
Test APIs
        │
        ▼
Build Project
        │
        ▼
Run Production Server
```

---

# ✅ Best Practices

- Keep source code inside `src`.
- Never edit compiled files inside `dist`.
- Use `npm run dev` while developing.
- Always build the project before production.
- Fix TypeScript errors instead of ignoring them.

---

# ❌ Common Mistakes

### Using `npm start` during development

Use `npm run dev` for a better development experience.

---

### Forgetting to build before deployment

Production servers need the compiled JavaScript.

---

### Editing files inside `dist`

`dist` is generated automatically.

Only modify files inside `src`.

---

# 🎤 Interview Questions

## Q1. What is the development workflow of a TypeScript backend project?

Write TypeScript → Run with `tsx` in watch mode → Test APIs → Repeat until complete.

---

## Q2. Why do we use `tsx` only during development?

Because it allows us to run TypeScript directly and automatically restart the server when files change, improving developer productivity.

---

## Q3. What changes in production?

TypeScript is compiled into JavaScript using `tsc`, and Node.js runs the compiled JavaScript.

---

## Q4. Why is `dist` created?

The `dist` folder contains the compiled JavaScript that Node.js executes in production.

---

# 📝 Summary

- Development and production follow different workflows.
- `tsx` improves the development experience.
- `tsc` prepares the application for production.
- Node.js executes JavaScript, not TypeScript.
- Our Authentication Service follows this workflow throughout its lifecycle.

---

# 📚 References

- TypeScript Documentation
- Node.js Documentation
- tsx Documentation

---

# 🔗 Related Notes

- [[01 - Project Initialization]]
- [[02 - TypeScript Setup]]
- [[03 - tsconfig.json]]
- [[04 - Express Setup]]
- [[05 - Project Structure]]
- [[06 - Package.json Scripts]]