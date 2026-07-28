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