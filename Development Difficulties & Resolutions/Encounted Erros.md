# Development Difficulties & Resolutions

## 📅 27 July 2026

### 1. ESM / CommonJS Configuration Error

#### ❌ Problem

While creating `app.ts`, I used modern ES Module syntax:

```ts
import express from "express";

const app = express();

app.use(express.json());

export default app;
```

TypeScript showed the following error:

```text
ECMAScript imports and exports cannot be written in a CommonJS file under 'verbatimModuleSyntax'.
```

#### 🔍 Why Did This Happen?

My `tsconfig.json` contained:

```json
"module": "nodenext",
"verbatimModuleSyntax": true
```

But my `package.json` did not specify that the project uses ES Modules.

Therefore, TypeScript treated the project as **CommonJS**, while my code was using **ES Module syntax**.

#### ✅ How Did I Resolve It?

I added the following to `package.json`:

```json
"type": "module"
```

After adding this, the project was configured to use **ES Modules**.

#### 🧠 What Did I Learn?

When using:

```json
"module": "nodenext"
```

TypeScript uses the `"type"` field in `package.json` to determine whether the project uses:

- ES Modules
    
- CommonJS
    

---

### 2. Accidentally Deleted the `docs` Folder

#### ❌ Problem

While working on the project folder structure, I accidentally deleted the `docs` folder.

As a result, my documentation files disappeared from the project.

#### 🔍 How Did I Identify It?

I ran:

```bash
git status
```

Git showed the documentation files as deleted.

#### ✅ How Did I Resolve It?

I used:

```bash
git restore docs
```

Git restored the deleted documentation from the latest committed version.

#### 🧠 What Did I Learn?

Git can be used to recover accidentally deleted files when those files were previously committed.

---

### 3. `.gitignore` Was Missing

#### ❌ Problem

I created a `.env` file for environment variables, but there was no `.gitignore` file in the project.

#### ⚠️ Why Was This a Problem?

The `.env` file will eventually contain sensitive information such as:

- Database connection details
    
- JWT secrets
    
- Environment-specific configuration
    

These values should **not** be pushed to GitHub.

#### ✅ How Did I Resolve It?

I created a `.gitignore` file in the project root.

Then I added:

```gitignore
.env
```

#### 🧠 What Did I Learn?

`.gitignore` tells Git which files should **not be tracked or committed**.

---

### 4. `.env` Was Showing as an Untracked File

#### ❌ Problem

After creating `.env`, I ran:

```bash
git status
```

Initially, Git showed:

```text
Untracked files:
    .env
    .gitignore
```

This meant Git was still detecting `.env`.

#### 🔍 What Did I Check?

I opened `.gitignore` and checked whether it contained:

```gitignore
.env
```

#### ✅ How Did I Resolve It?

I made sure `.gitignore` contained exactly:

```gitignore
.env
```

Then I saved the file and ran:

```bash
git status
```

After that, Git showed only:

```text
Untracked files:
    .gitignore
```

The `.env` file was no longer shown.

#### 🧠 What Did I Learn?

`git status` can be used to verify whether Git is correctly ignoring files specified in `.gitignore`.

---

# 🎯 Key Learnings From 27 July 2026

- Understand the difference between **ES Modules** and **CommonJS**.
    
- Understand how `"module": "nodenext"` works with `"type": "module"`.
    
- Use `git restore` to recover accidentally deleted committed files.
    
- Use `.gitignore` to prevent sensitive files such as `.env` from being committed.
    
- Use `git status` to check the current state of the Git working directory.
    
- Understand how Git determines whether a file should be tracked or ignored.
  
  
  ---

# 📅 Date
28 July 2026

# 🎯 Topic
Environment Configuration (`env.ts`) & `process.exit(1)`

---

# 📚 What I Learned

## 1. Environment Variables

- `.env` stores configuration values as **strings**.
- `process.env.PORT` returns:
  - `string` if the variable exists.
  - `undefined` if the variable is missing.
- Environment variables should never be used directly throughout the project.
- A dedicated configuration file (`env.ts`) should read, validate, convert, and export safe values.

---

## 2. Configuration Validation

Validation flow:

```
.env
   ↓
process.env.PORT
   ↓
Check if PORT exists
   ↓
Convert using parseInt()
   ↓
Check with isNaN()
   ↓
Export validated number
```

---

## 3. Missing vs Invalid Configuration

### Missing Configuration

Example:

```env
# PORT is missing
```

Result:

```
PORT environment variable is missing.
```

---

### Invalid Configuration

Example:

```env
PORT=hello
```

Result:

```
Invalid PORT value.
```

Production applications distinguish these two cases because they communicate different problems.

---

## 4. Why Convert PORT?

`.env` always stores strings.

```
PORT=3000
```

becomes

```ts
process.env.PORT // "3000"
```

The application needs a number, so convert it:

```ts
parseInt(PORT, 10)
```

---

## 5. parseInt()

Purpose:

Convert a string into a number.

Example:

```ts
parseInt("3000", 10)
```

returns

```ts
3000
```

Invalid values return:

```ts
NaN
```

instead of throwing an exception.

---

## 6. isNaN()

Purpose:

Check whether the conversion failed.

```ts
isNaN(PORT_NUMBER)
```

- `true` → invalid number
- `false` → valid number

---

## 7. Fail Fast Principle

If critical configuration is invalid:

- Print an error.
- Stop the application immediately.

Do **not** allow the server to continue with broken configuration.

---

## 8. process.exit(1)

### What is `process`?

A global Node.js object representing the currently running Node.js process.

Examples:

- `process.env`
- `process.argv`
- `process.pid`
- `process.cwd()`
- `process.exit()`

---

### What does `process.exit()` do?

Terminates the entire Node.js application immediately.

No code after it executes.

Example:

```ts
console.error("PORT environment variable is missing.");
process.exit(1);

console.log("Server Started");
```

Output:

```
PORT environment variable is missing.
```

The last line never runs.

---

## 9. Exit Codes

```
0 → Success
1 → Failure
```

The operating system, Docker, PM2, GitHub Actions, Jenkins, and CI/CD pipelines use exit codes to determine whether the application succeeded or failed.

---

## 10. Why Not process.exit(0)?

Incorrect:

```ts
console.error("PORT is missing");
process.exit(0);
```

This tells the operating system:

```
Application completed successfully.
```

even though an error occurred.

Correct:

```ts
console.error("PORT is missing");
process.exit(1);
```

Now the operating system knows the application failed.

---

## 11. console.error() vs process.exit()

`console.error()`

Audience:

- Developers

Purpose:

- Display error messages in logs.

---

`process.exit()`

Audience:

- Operating System
- Docker
- PM2
- GitHub Actions
- CI/CD Pipelines

Purpose:

- Indicate whether the application succeeded or failed.

---

# 🛠 Final `env.ts`

```ts
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

if (!PORT) {
    console.error("PORT environment variable is missing.");
    process.exit(1);
}

const PORT_NUMBER = parseInt(PORT, 10);

if (isNaN(PORT_NUMBER)) {
    console.error("Invalid PORT value.");
    process.exit(1);
}

export default PORT_NUMBER;
```

---

# 💡 Key Takeaways

- Never trust environment variables blindly.
- Validate configuration before starting the server.
- Export validated values instead of raw environment variables.
- Use `process.exit(1)` for fatal startup errors.
- `console.error()` informs developers.
- Exit codes inform the operating system and automation tools.
- Configuration should fail fast to prevent undefined application behavior.
  
  
  ---
# 📓 Backend Engineering Learning Journal
## Day 1 – Difficulties Faced
**Project:** Authentication Service (Node.js + TypeScript + PostgreSQL)

**Date:** 29 July 2026

---

# 🎯 Purpose

This note records the difficulties I faced during today's session, why they happened, and how I plan to overcome them.

---

# 🚧 Difficulty 1: Jumping to Coding Before Environment Setup

## What Happened

I wanted to start writing the database connection code (`database.ts`) before checking whether PostgreSQL was installed.

## Why It Happened

I was focused on coding and overlooked the basic prerequisite of having a database server installed.

## What I Learned

Before writing backend code, always verify that all required tools and services are installed and running.

## Action Item

- Install PostgreSQL.
- Verify PostgreSQL is running.
- Open pgAdmin successfully before writing connection code.

---

# 🚧 Difficulty 2: Incomplete Environment Configuration

## What Happened

My `env.ts` only handled the `PORT` environment variable.

## Why It Happened

I designed it only for starting the Express server and didn't think ahead about database configuration.

## What I Learned

A centralized configuration file should manage all required environment variables.

Future variables include:

- PORT
- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD

## Action Item

Refactor `env.ts` into a reusable configuration module after PostgreSQL setup.

---

# 🚧 Difficulty 3: Not Recognizing Duplicate Validation Logic

## What Happened

I validated only `PORT`, but I didn't think about how the same validation would be repeated for every new environment variable.

## Why It Happened

I focused on making the current code work rather than making it reusable.

## What I Learned

Whenever similar code starts repeating, it's usually a sign that it should be extracted into a reusable function.

## Action Item

Learn how to create a reusable helper function like:

```ts
getEnv(variableName: string)
```

---

# 🚧 Difficulty 4: Lack of PostgreSQL Experience

## What Happened

When asked about database connectivity, I realized this would be my first PostgreSQL project.

## Why It Happened

Most of my previous work was in Oracle APEX, so PostgreSQL is a new technology for me.

## What I Learned

It's okay to be new to a technology. Understanding the concepts is more important than memorizing commands.

## Action Item

Build the project step by step instead of rushing.

---

# 🚧 Difficulty 5: Installation Process Confusion

## What Happened

During PostgreSQL installation, Stack Builder asked:

> "Please select the application you would like to install."

I wasn't sure whether I needed to install anything.

## Why It Happened

I wasn't familiar with PostgreSQL's installation process.

## What I Learned

Stack Builder installs optional extensions and tools. It is not required for our Authentication Service project.

## Action Item

Ignore optional components unless the project specifically requires them.

---

# 💡 Biggest Realization Today

Backend development doesn't start with writing APIs.

It starts with preparing the development environment correctly.

Skipping installation or configuration leads to unnecessary problems later.

---

# 📝 Questions I Should Always Ask Before Coding

- Is the required software installed?
- Is the service running?
- Do I have the correct credentials?
- Have I configured my environment variables?
- Can my application actually connect to the database?

---

# 📚 Key Lessons

- Never assume prerequisites are complete.
- Verify the environment before writing code.
- Keep configuration centralized.
- Avoid duplicate code.
- Learn the reasoning behind each step instead of memorizing commands.

---

# 🎯 Plan for Next Session

- [ ] Finish PostgreSQL installation.
- [ ] Open pgAdmin.
- [ ] Create the `authentication_management` database.
- [ ] Configure `.env` with database credentials.
- [ ] Build `database.ts`.
- [ ] Test the first database connection.

---

# 🚀 Reflection

Today's session reminded me that backend engineering is not only about writing code. A significant part of the work is setting up the environment, understanding the architecture, and preparing a solid foundation before implementing features.

These challenges are expected when learning a new technology stack, and overcoming them now will make future development smoother.