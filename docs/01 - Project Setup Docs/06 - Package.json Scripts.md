

> [!info]
> **Project:** Authentication Service
> **Phase:** Project Setup
> **Configuration:** npm Scripts
> **Objective:** Understand how npm scripts simplify development, building, and running our backend application.

---

# 📖 Overview

`package.json` contains a section called **scripts**.

Scripts allow us to define reusable commands that automate common development tasks.

Instead of remembering long terminal commands, we can execute them with simple npm commands.

For our Authentication Service, scripts help us:

- Start the development server.
- Automatically restart when files change.
- Compile TypeScript.
- Run the production build.

---

# 🎯 Learning Objectives

After completing this note, you should understand:

- What npm scripts are.
- Why they are important.
- How each script works.
- The scripts used in our Authentication Service.
- The difference between development and production execution.

---

# 🤔 What are npm Scripts?

npm scripts are **custom commands** defined inside the `scripts` section of `package.json`.

Example:

```json
{
    "scripts": {
        "dev": "tsx watch src/server.ts"
    }
}
```

Now instead of typing:

```bash
tsx watch src/server.ts
```

we simply run:

```bash
npm run dev
```

npm looks inside `package.json`, finds the `dev` script, and executes it.

---

# 🏗️ Real-Life Example

Imagine you work in an office.

Instead of telling every employee:

1. Turn on the lights.
2. Start the AC.
3. Unlock the doors.
4. Start the computers.

You create one button:

```
Office Start
```

Pressing that button performs all the tasks automatically.

npm scripts work in the same way.

Instead of remembering long commands, we create one meaningful command.

---

# 📦 Scripts Used in Our Project

Our `package.json` contains:

```json
"scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
}
```

---

# ⚙️ Script Breakdown

## 1. Development Script

```json
"dev": "tsx watch src/server.ts"
```

### What?

Starts the application in development mode.

### How?

- Runs `server.ts`.
- Watches for file changes.
- Automatically restarts the server whenever a file is saved.

### Command

```bash
npm run dev
```

### Why?

During development, we frequently modify code.

Without watch mode:

```text
Edit File
Stop Server
Start Server Again
Repeat...
```

With watch mode:

```text
Edit File
        │
        ▼
Save
        │
        ▼
Server Restarts Automatically
```

This improves development speed and productivity.

---

## 2. Build Script

```json
"build": "tsc"
```

### What?

Compiles all TypeScript files into JavaScript.

### Command

```bash
npm run build
```

### Flow

```text
src/
      │
      ▼
TypeScript Compiler
      │
      ▼
dist/
```

The compiled JavaScript is placed inside the `dist` directory.

---

## 3. Start Script

```json
"start": "node dist/server.js"
```

### What?

Runs the compiled JavaScript application.

### Command

```bash
npm start
```

### Why?

In production, Node.js executes JavaScript, not TypeScript.

Therefore, we first build the project and then run the compiled output.

---

# 🔄 Development vs Production Flow

## Development

```text
Write TypeScript
        │
        ▼
npm run dev
        │
        ▼
tsx
        │
        ▼
Automatic Restart
```

---

## Production

```text
Write TypeScript
        │
        ▼
npm run build
        │
        ▼
JavaScript Generated
        │
        ▼
npm start
        │
        ▼
Node.js Executes JavaScript
```

---

# 💼 Project Context

During this Authentication Service project:

### While developing

We'll mostly use:

```bash
npm run dev
```

because it provides automatic server restarts.

---

### Before deployment

We'll use:

```bash
npm run build
```

to compile the application.

---

### In production

The server will run using:

```bash
npm start
```

which executes the compiled JavaScript.

---

# 🏭 Production Perspective

In professional backend projects, npm scripts often include additional commands such as:

```json
"lint": "eslint .",
"format": "prettier --write .",
"test": "jest",
"test:watch": "jest --watch",
"docker": "docker compose up"
```

As our project grows, we may add similar scripts to automate development tasks.

---

# ✅ Best Practices

- Use meaningful script names (`dev`, `build`, `start`).
- Keep scripts simple and focused.
- Use watch mode during development.
- Always build before running in production.
- Document custom scripts in the README if they are not self-explanatory.

---

# ❌ Common Mistakes

### Running `npm start` before building

The `start` script expects compiled JavaScript inside the `dist` folder.

If `npm run build` has not been executed, the application will fail to start.

---

### Editing files inside `dist`

Never modify compiled JavaScript directly.

Always edit the TypeScript source files inside `src`.

---

### Using `tsx` in production

`tsx` is intended for development.

Production environments should execute compiled JavaScript using Node.js.

---

# 🎤 Interview Questions

## Q1. What are npm scripts?

npm scripts are custom commands defined in `package.json` that automate common development and build tasks.

---

## Q2. Why do we use `npm run dev`?

To start the TypeScript application in development mode with automatic restarts when files change.

---

## Q3. Why do we need `npm run build`?

To compile TypeScript into JavaScript because Node.js executes JavaScript, not TypeScript.

---

## Q4. What is the purpose of `npm start`?

To run the compiled JavaScript application in production.

---

## Q5. Why don't we use `tsx` in production?

Because `tsx` is a development tool. Production environments should run compiled JavaScript for better performance and predictability.

---

# 📝 Summary

- npm scripts automate repetitive commands.
- `dev` starts the development server with watch mode.
- `build` compiles TypeScript into JavaScript.
- `start` runs the compiled JavaScript application.
- Development and production use different execution workflows.

---

# 📚 References

- https://docs.npmjs.com/cli/v10/using-npm/scripts
- https://nodejs.org/
- https://tsx.is/

---

# 🔗 Related Notes

- [[01 - Project initialization]]
- [[02 - TypeScript Setup]]
- [[03 - tsconfig.json]]
- [[04 - Express Setup]]
- [[05 - Project Structure]]