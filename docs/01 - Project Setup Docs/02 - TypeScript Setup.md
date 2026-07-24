

> [!info]
> **Project:** Authentication Service
> **Phase:** Project Setup
> **Technology:** TypeScript
> **Objective:** Configure TypeScript as the programming language for our backend application.

---

# 📖 Overview

TypeScript is a strongly typed programming language built on top of JavaScript.

It extends JavaScript by adding **static typing**, which helps developers catch errors during development instead of at runtime.

For our Authentication Service, TypeScript improves code quality, readability, maintainability, and scalability.

---

# 🎯 Learning Objectives

After completing this note, you should understand:

- What TypeScript is.
- Why modern backend projects use TypeScript.
- How TypeScript works internally.
- Why Node.js cannot execute TypeScript directly.
- Why our Authentication Service is built using TypeScript instead of JavaScript.

---

# 🤔 What is TypeScript?

TypeScript is an open-source programming language developed by Microsoft.

It is a **superset of JavaScript**, meaning:

- Every JavaScript program is valid TypeScript.
- TypeScript adds additional features like static typing, interfaces, enums, generics, and compile-time error checking.

```text
JavaScript
      +
Static Types
      +
Better Tooling
      +
Compile-Time Error Checking
      =
TypeScript
```

---

# ❓ Why Do We Use TypeScript?

As backend applications grow, the number of files, APIs, services, and developers increases.

Without TypeScript:

- Type-related bugs are discovered only after running the application.
- Refactoring becomes difficult.
- Large codebases become harder to maintain.

With TypeScript:

- Errors are caught during development.
- IDEs provide intelligent autocomplete.
- Code becomes easier to understand.
- Refactoring becomes much safer.

---

# 🏗️ Real-Life Example

Imagine filling out an online passport application.

Before submitting, the form validates:

- Name cannot be empty.
- Age must be a number.
- Email must be valid.

If something is incorrect, it immediately shows an error.

TypeScript works similarly.

Instead of waiting until the application runs, it validates many coding mistakes while you're writing the code.

---

# ⚙️ How Does TypeScript Work?

TypeScript cannot be executed directly by Node.js.

The TypeScript compiler converts `.ts` files into JavaScript (`.js`) files.

Flow:

```text
TypeScript (.ts)
        │
        ▼
TypeScript Compiler (tsc)
        │
        ▼
JavaScript (.js)
        │
        ▼
Node.js Runtime
```

Node.js only understands JavaScript.

---

# 💼 Project Context

In our Authentication Service, every backend component will be written in TypeScript.

Examples:

- Controllers
- Services
- Repositories
- Middleware
- Models
- Utility functions

Using TypeScript ensures that data passed between these layers is type-safe and easier to maintain.

---

# 📦 Packages Installed

We installed the following packages:

## TypeScript

```bash
npm install -D typescript
```

Purpose:

Provides the TypeScript compiler (`tsc`) to compile `.ts` files into JavaScript.

---

## tsx

```bash
npm install -D tsx
```

Purpose:

Runs TypeScript files directly during development without manually compiling them.

It also supports **watch mode**, automatically restarting the application whenever a file changes.

---

## Node.js Type Definitions

```bash
npm install -D @types/node
```

Purpose:

Provides TypeScript definitions for Node.js APIs such as:

- `process`
- `Buffer`
- `fs`
- `path`
- `http`

Without this package, TypeScript cannot understand many built-in Node.js features.

---

# 📁 Files Created

During setup we created:

```text
Authentication-Service/

├── src/
│   └── server.ts
│
├── tsconfig.json
├── package.json
└── node_modules/
```

---

# 🔄 Development Flow

```text
Write TypeScript
        │
        ▼
Save File
        │
        ▼
tsx Watch
        │
        ▼
Application Restarts
        │
        ▼
See Changes Immediately
```

---

# ✅ Advantages of TypeScript

- Compile-time error checking.
- Better IDE support.
- Strong typing.
- Easier refactoring.
- Improved readability.
- Better scalability.
- Safer large codebases.

---

# ⚠️ Common Misconceptions

### "TypeScript replaces JavaScript."

❌ Incorrect.

TypeScript compiles into JavaScript.

---

### "Node.js runs TypeScript."

❌ Incorrect.

Node.js executes JavaScript.

TypeScript must first be compiled or executed using tools such as `tsx`.

---

### "TypeScript makes applications faster."

❌ Incorrect.

TypeScript improves the **developer experience**, not runtime performance.

---

# ✅ Best Practices

- Enable strict mode.
- Keep TypeScript configuration simple.
- Use meaningful types.
- Avoid using `any` unless absolutely necessary.
- Separate source code (`src`) from compiled output (`dist`).

---

# ❌ Common Mistakes

### Installing TypeScript globally

Always install it locally inside the project.

---

### Ignoring compiler errors

Compiler errors are opportunities to fix problems before production.

---

### Using `any` everywhere

Doing so removes many of TypeScript's advantages.

---

# 🎤 Interview Questions

## Q1. What is TypeScript?

TypeScript is a statically typed superset of JavaScript that compiles into JavaScript and helps detect errors during development.

---

## Q2. Why do backend applications use TypeScript?

To improve maintainability, readability, scalability, and type safety while reducing runtime errors.

---

## Q3. Can Node.js execute TypeScript directly?

No.

Node.js executes JavaScript.

TypeScript must first be compiled or run using tools such as `tsx`.

---

## Q4. Why do we use `tsx`?

`tsx` allows developers to run TypeScript files directly during development without manually compiling them.

It also supports watch mode for automatic restarts.

---

# 📝 Summary

- TypeScript is a superset of JavaScript.
- It adds static typing and compile-time error checking.
- Node.js executes JavaScript, not TypeScript.
- The TypeScript compiler converts `.ts` files into `.js`.
- Our Authentication Service uses TypeScript to improve maintainability and reduce runtime bugs.

---

# 🔗 Related Notes

- [[01 - Project initialization]]
- [[03 - tsconfig.json]]
- [[04 - Express Setup]]
- [[06 - Package.json Scripts]]