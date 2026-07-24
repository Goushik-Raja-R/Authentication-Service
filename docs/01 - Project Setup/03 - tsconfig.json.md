

> [!info]
> **Project:** Authentication Service
> **Phase:** Project Setup
> **Configuration:** TypeScript Compiler
> **Objective:** Configure how TypeScript compiles our backend application.

---

# 📖 Overview

`tsconfig.json` is the configuration file for the TypeScript compiler (`tsc`).

It tells TypeScript:

- Where our source code is located.
- Where compiled JavaScript should be generated.
- Which JavaScript version to target.
- Which module system to use.
- Which compiler rules to follow.

Without this file, TypeScript uses default settings, which may not be suitable for a backend project.

---

# 🎯 Learning Objectives

After completing this note, you should understand:

- What `tsconfig.json` is.
- Why every TypeScript project needs it.
- How TypeScript uses it during compilation.
- The purpose of each configuration option we enabled.
- Why we removed some default options.

---

# 🤔 What is tsconfig.json?

`tsconfig.json` is the **configuration file for the TypeScript compiler**.

Whenever you run:

```bash
tsc
```

TypeScript first reads:

```text
tsconfig.json
```

Then it follows the instructions inside that file to compile your project.

Think of it as the **instruction manual** for the TypeScript compiler.

---

# 🏗️ Real-Life Example

Imagine you're building a house.

The workers don't decide everything on their own.

They follow a blueprint that specifies:

- Where rooms should be.
- How many floors to build.
- Which materials to use.

Similarly,

TypeScript follows the instructions in `tsconfig.json`.

```text
Blueprint
      │
      ▼
Construction Workers
      │
      ▼
Finished House
```

```text
tsconfig.json
      │
      ▼
TypeScript Compiler
      │
      ▼
JavaScript Output
```

---

# 🔄 Compilation Flow

```text
Developer Writes Code
        │
        ▼
src/server.ts
        │
        ▼
tsconfig.json
        │
        ▼
TypeScript Compiler (tsc)
        │
        ▼
dist/server.js
```

---

# ⚙️ Configuration Used

## 1. rootDir

```json
"rootDir": "./src"
```

### What?

Specifies the folder containing the project's source code.

### Why?

Keeps all TypeScript source files inside the `src` directory.

### Project Context

All application code will be written inside:

```text
src/
```

---

## 2. outDir

```json
"outDir": "./dist"
```

### What?

Specifies where compiled JavaScript files should be generated.

### Why?

Separates source code from compiled code.

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

---

## 3. module

```json
"module": "nodenext"
```

### What?

Specifies which module system TypeScript should generate.

### Why?

Modern versions of Node.js use ECMAScript Modules (ESM).

Using `NodeNext` ensures TypeScript follows Node.js's modern module resolution.

---

## 4. target

```json
"target": "esnext"
```

### What?

Specifies the JavaScript version that TypeScript should generate.

### Why?

Our project uses a modern version of Node.js that supports the latest JavaScript features.

---

## 5. types

```json
"types": ["node"]
```

### What?

Loads Node.js type definitions.

### Why?

Allows TypeScript to understand Node.js APIs such as:

- process
- Buffer
- fs
- path

---

## 6. sourceMap

```json
"sourceMap": true
```

### What?

Generates source map files.

### Why?

Allows debugging compiled JavaScript while viewing the original TypeScript source code.

---

## 7. strict

```json
"strict": true
```

### What?

Enables TypeScript's strict type-checking mode.

### Why?

Helps catch programming mistakes during development.

This is one of the most important compiler options.

---

## 8. verbatimModuleSyntax

```json
"verbatimModuleSyntax": true
```

### What?

Preserves your import and export statements as written.

### Why?

Works well with modern Node.js module behavior.

---

## 9. isolatedModules

```json
"isolatedModules": true
```

### What?

Ensures every file can be compiled independently.

### Why?

Improves compatibility with modern build tools.

---

## 10. skipLibCheck

```json
"skipLibCheck": true
```

### What?

Skips type checking of third-party library declaration files.

### Why?

Speeds up compilation without affecting our application code.

---

# ❌ Options We Removed

During setup we intentionally removed some default options.

## JSX

```json
"jsx": "react-jsx"
```

Reason:

Our project is a backend application, not a React frontend.

---

## declaration

```json
"declaration": true
```

Reason:

Declaration files are useful when building reusable npm libraries.

Our Authentication Service is an application.

---

## declarationMap

Reason:

Only needed when generating declaration files.

---

## moduleDetection

Reason:

The default behavior is sufficient for our project.

---

## noUncheckedSideEffectImports

Reason:

Useful in some advanced projects but unnecessary for our current learning stage.

---

## noUncheckedIndexedAccess

Reason:

Advanced compiler option.

We'll introduce it later after becoming comfortable with TypeScript.

---

## exactOptionalPropertyTypes

Reason:

Another advanced compiler option that we'll study in a future project.

---

# 💼 Project Context

Our Authentication Service follows this structure:

```text
src/
      │
      ▼
TypeScript Compiler
      │
      ▼
dist/
      │
      ▼
Node.js
```

Every backend feature we build—controllers, services, middleware, repositories—will follow this compilation process.

---

# ✅ Best Practices

- Keep source code inside `src`.
- Keep compiled code inside `dist`.
- Enable strict mode.
- Use modern module settings.
- Avoid unnecessary compiler options.

---

# ❌ Common Mistakes

### Mixing JavaScript and TypeScript files

Keep your source code consistently in TypeScript.

---

### Compiling into the source folder

Always use a separate output directory such as `dist`.

---

### Disabling strict mode

Avoid turning off strict mode just to silence compiler errors.

---

# 🎤 Interview Questions

## Q1. What is tsconfig.json?

It is the configuration file for the TypeScript compiler.

---

## Q2. Why do we use rootDir?

To specify where our TypeScript source code is located.

---

## Q3. Why do we use outDir?

To keep compiled JavaScript separate from source code.

---

## Q4. Why is strict mode important?

It catches many programming mistakes during development and improves code quality.

---

## Q5. Why did you remove JSX?

Because our project is a backend application and does not render React components.

---

# 📝 Summary

- `tsconfig.json` controls how TypeScript compiles the project.
- It defines the source folder, output folder, module system, compiler rules, and debugging behavior.
- We simplified the default configuration to include only the options required for a modern Node.js backend.

---

# 📚 References

- https://www.typescriptlang.org/tsconfig
- https://www.typescriptlang.org/docs/

---

# 🔗 Related Notes

- [[01 - Project Initialization]]
- [[02 - TypeScript Setup]]
- [[04 - Express Setup]]
- [[06 - Package.json Scripts]]