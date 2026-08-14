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

---

# 📅 Backend Journey - Day 4
**Project:** Authentication Management Service
**Date:** 31 July 2026

---

# 🎯 Goal of Today's Session

Today we moved from database design to actually interacting with PostgreSQL.

We successfully:

- Created our first production-style table.
- Understood every SQL constraint instead of memorizing syntax.
- Learned how PostgreSQL executes SQL.
- Learned how INSERT works conceptually.
- Inserted our first SQL query (almost perfectly).

---

# 📚 Concepts Learned

## 1. CREATE TABLE

A table is created inside:

PostgreSQL Server
→ Database
→ Schema
→ Table

Since our Query Tool was connected to:

authentication_management

PostgreSQL automatically created the table inside:

public.users

---

## 2. Production Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Every line now makes sense.

---

## 3. SERIAL

Purpose:

Automatically generates increasing integer IDs.

Example:

```
1
2
3
4
...
```

No manual ID assignment required.

---

## 4. PRIMARY KEY

Purpose:

- Every row has a unique identity.
- Used to identify records efficiently.
- Cannot contain duplicates.
- Cannot be NULL.

---

## 5. VARCHAR

Stores text.

Examples:

- Name
- Email
- Password Hash

We chose:

```
Name      -> VARCHAR(50)
Email     -> VARCHAR(255)
Password  -> VARCHAR(255)
```

Reason:

Use realistic limits based on expected data.

---

## 6. UNIQUE Constraint

Business Rule:

One email = One account

Database Rule:

```
UNIQUE(email)
```

Even if application code fails,
PostgreSQL prevents duplicate emails.

---

## 7. NOT NULL

Purpose:

Mandatory fields cannot be empty.

Example:

```
name VARCHAR(50) NOT NULL
```

Without this:

```
Name = NULL
```

would be accepted.

The database becomes the final layer of protection.

---

## 8. CURRENT_TIMESTAMP

Purpose:

Automatically fills timestamps during INSERT.

Example:

```
created_at
updated_at
```

The value comes from PostgreSQL's own system clock.

---

## 9. DEFAULT

One of today's biggest lessons.

DEFAULT executes ONLY during INSERT.

Example:

```
created_at DEFAULT CURRENT_TIMESTAMP
```

When a row is created:

PostgreSQL automatically fills the timestamp.

During UPDATE:

DEFAULT is NOT executed again.

---

## 10. Why updated_at Doesn't Change Automatically

This was today's biggest realization.

Wrong assumption:

```
DEFAULT CURRENT_TIMESTAMP
```

means

```
Always update timestamp.
```

Reality:

DEFAULT only works during INSERT.

During UPDATE we must explicitly write:

```sql
updated_at = CURRENT_TIMESTAMP
```

or later use a Trigger.

---

# CRUD

We officially started CRUD.

CRUD stands for:

- Create
- Read
- Update
- Delete

Today's focus:

✅ CREATE

Next:

SELECT

---

# INSERT

We wrote our first INSERT statement.

Initial version:

```sql
VALUES("goushik")
```

Mistake:

PostgreSQL uses:

Single Quotes

Correct:

```sql
VALUES('goushik')
```

Lesson:

Double Quotes → Identifiers

Single Quotes → String values

---

# PostgreSQL Automatically Fills

When we execute:

```sql
INSERT INTO users(name,email,password)
VALUES(...);
```

PostgreSQL automatically fills:

- id
- created_at
- updated_at

because of:

- SERIAL
- DEFAULT CURRENT_TIMESTAMP

---

# Security Lesson

Current:

```
Password
```

Learning purpose only.

Production:

```
Password
↓

bcrypt.hash()

↓

Store hash only
```

Never store plain text passwords.

---

# Biggest Engineering Lessons Today

## Lesson 1

Database constraints protect data integrity.

Do not rely only on application code.

---

## Lesson 2

DEFAULT executes only during INSERT.

It does not execute during UPDATE.

---

## Lesson 3

The database should enforce important business rules.

Examples:

- PRIMARY KEY
- UNIQUE
- NOT NULL

---

## Lesson 4

The database is the last line of defense.

Application validates.

Database enforces.

Both are necessary.

---

# Mistakes I Made Today

### 1.

Used double quotes for string values.

Correction:

```sql
'goushik'
```

instead of

```sql
"goushik"
```

---

### 2.

Initially thought DEFAULT CURRENT_TIMESTAMP might update updated_at automatically.

Correction:

DEFAULT only executes during INSERT.

UPDATE requires explicit timestamp update.

---

# Progress Tracker

✅ PostgreSQL Installed

✅ pgAdmin Configured

✅ Database Created

✅ Schema Understood

✅ users Table Designed

✅ First CREATE TABLE Executed

✅ First INSERT Statement Written

⬜ Execute INSERT Successfully

⬜ SELECT

⬜ UPDATE

⬜ DELETE

⬜ Connect Node.js with PostgreSQL

⬜ User Registration API

⬜ Login API

⬜ Password Hashing

⬜ JWT Authentication

⬜ Refresh Tokens

---

# Interview Questions Covered

1. Why separate databases for different services?

2. Why PRIMARY KEY?

3. Why UNIQUE on email?

4. Why NOT NULL?

5. Why SERIAL?

6. Why use CURRENT_TIMESTAMP?

7. Why doesn't updated_at update automatically?

8. Difference between DEFAULT and UPDATE.

9. Why use users instead of user?

10. Why should passwords never be stored as plain text?

---

# Senior Engineer Advice

Today's biggest achievement wasn't writing SQL.

It was understanding the reasoning behind every part of the table.

A backend engineer should always ask:

- Why this datatype?
- Why this constraint?
- What business rule does this enforce?
- What happens if I remove it?

If you can answer those questions, you're designing systems—not copying syntax.


---

---
date: 2026-08-04
project: Authentication Service
tags:
  - backend
  - nodejs
  - typescript
  - postgresql
  - database
  - async-await
status: Completed
---

# 📅 Session - 2026-08-04

## 🎯 Session Goal
Establish the first successful connection between the Node.js backend and PostgreSQL while understanding every concept involved instead of simply writing the code.

---

# ✅ Topics Covered

## 1. Environment Variables

### Added Database Configuration

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=authentication_management
DB_USER=postgres
DB_PASSWORD=********
```

### Learned

- Why sensitive credentials should never be hardcoded.
- `.env` stores configuration for different environments.
- Development and production can use different `.env` files without changing application code.

---

## 2. `env.ts`

### Responsibilities

- Read environment variables.
- Validate required variables.
- Convert data types.
- Export validated configuration.

### Implemented

- Read
  - PORT
  - DB_HOST
  - DB_PORT
  - DB_NAME
  - DB_USER
  - DB_PASSWORD

- Presence Validation

- Number Conversion

```typescript
PORT -> PORT_NUMBER

DB_PORT -> DB_PORT_NUMBER
```

### Architecture

```
.env
    │
    ▼
env.ts
(Read + Validate + Export)
```

---

## 3. `database.ts`

### Learned

- Why we use `Pool`
- Why we create only one pool
- Why the pool should be reused throughout the application

### Created

```typescript
const pool = new Pool({
    host,
    port,
    database,
    user,
    password
});
```

### Architecture

```
.env

↓

env.ts

↓

database.ts

↓

Pool

↓

PostgreSQL
```

---

## 4. Connection Pool

### Learned

Instead of

```
Every Request

↓

Create Connection

↓

Execute Query

↓

Close Connection
```

We use

```
Pool

↓

Reusable Connections

↓

Better Performance
```

---

## 5. Async Programming

### Topics

- async
- await
- Promise

### Understanding

```
Database Query

↓

WAIT

↓

Receive Result

↓

Continue Execution
```

### Realization

> Without the query execution, we cannot know whether the user exists or not.

---

## 6. Database Query

Executed the first query from the backend.

```sql
SELECT NOW();
```

Purpose

- Verify PostgreSQL connection.
- Verify backend can execute SQL.
- Verify PostgreSQL returns data.

---

## 7. Query Result

Learned that

```typescript
await pool.query(...)
```

returns a **Query Result Object**

Structure

```
Result

├── command
├── rowCount
├── rows
├── fields
└── types
```

Most important property

```typescript
result.rows
```

or

```typescript
result.rows[0]
```

---

## 8. Startup Architecture

Discussed where

```
testDatabaseConnection()
```

should live.

Conclusion

- Not Controller
- Not Service
- Not Repository

It should be executed during application startup before Express starts listening.

---

## ⚠️ Difficulties Faced

### 1. async / await

Initially unclear about

- Why async is required.
- Why await is needed.
- How asynchronous execution works.

Current Understanding

```
Send Query

↓

Wait

↓

Receive Result

↓

Continue
```

---

### 2. Query Result

Initially thought

```sql
SELECT NOW();
```

returns only the current timestamp.

Now understood

```
pool.query()

↓

Returns

↓

Query Result Object
```

Actual data is inside

```typescript
result.rows
```

---

### 3. Project Architecture

Initially confused about

Where should

```
testDatabaseConnection()
```

be written.

Current Understanding

```
database.ts

↓

Creates Pool

↓

Export Pool

↓

Other Files Import Pool
```

---

## 💡 Important Takeaways

- Every file should have one responsibility.
- Configuration should be centralized.
- Never hardcode credentials.
- Reuse a single Pool instance.
- Database operations are asynchronous.
- await pauses only the current async function.
- Query results are obtained from `result.rows`.
- Startup logic is different from business logic.

---

# 🏆 Milestones Achieved

- [x] PostgreSQL Installed
- [x] PostgreSQL Connected
- [x] Environment Variables Configured
- [x] env.ts Created
- [x] database.ts Created
- [x] Connection Pool Created
- [x] Async/Await Understood
- [x] First SQL Query Executed from Backend

---

# 📌 Next Session

## Database Connection

- [ ] Create `testDatabaseConnection.ts`
- [ ] Import reusable `pool`
- [ ] Test connection during startup

## Authentication Module

- [ ] Create Routes
- [ ] Create Controller
- [ ] Create Service
- [ ] Create Repository
- [ ] Build `POST /register`

---

# 🚀 Progress

```
Authentication Service

██████████████████░░░░░░░░░░░░░░░ 35%

Completed

✅ Project Setup
✅ Express
✅ TypeScript
✅ PostgreSQL
✅ SQL
✅ Environment Configuration
✅ Database Connection

Next

⬜ Register API
⬜ Login API
⬜ JWT
⬜ Refresh Token
⬜ Authentication Middleware
⬜ Testing
⬜ Docker
⬜ CI/CD
⬜ Deployment
```


---

---
tags:
  - Backend
  - Authentication
  - ExpressJS
  - TypeScript
  - PostgreSQL
  - bcrypt
  - RepositoryPattern
  - Learning
date: 2026-08-06
---

# 📅 2026-08-06 - Backend Authentication Service (Session Wrap)

## 🎯 Session Goal

Complete the **User Registration API** using the layered architecture:

```text
Client
   │
   ▼
Routes
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
PostgreSQL
```

---

# ✅ What We Completed

## 1. Completed the Register API

Successfully implemented the complete **User Registration API**.

### Flow

```text
Client
    │
    ▼
POST /api/v1/auth/register
    │
    ▼
Routes
    │
    ▼
Controller
    │
    ▼
Service
    │
    ├── Check Existing User
    ├── Hash Password
    ├── Create New User Object
    └── Call createUser()
    │
    ▼
Repository
    │
    ├── SELECT
    └── INSERT
    │
    ▼
PostgreSQL
```

---

# 🗄️ Repository Layer

## ✅ Implemented `existingUser(email)`

### Responsibilities

- Imported PostgreSQL connection pool.
- Used parameterized SQL query.
- Returned:
  - User object if found.
  - `undefined` if user doesn't exist.

### Learned

Repository should only communicate with the database.

It should **not** make business decisions.

---

## ✅ Implemented `createUser(user)`

### SQL Query

```sql
INSERT INTO users(name,email,password)
VALUES($1,$2,$3)
RETURNING id,name,email;
```

### Learned

❌ Wrong

```sql
VALUES('$1','$2','$3')
```

✅ Correct

```sql
VALUES($1,$2,$3)
```

---

## PostgreSQL `RETURNING`

Initially:

```sql
INSERT INTO users(...)
VALUES(...);
```

Result:

```
Rows inserted

↓

No returned data
```

After adding:

```sql
RETURNING id,name,email;
```

Result:

```text
Inserted User

↓

Returned to Repository

↓

Returned to Service

↓

Returned to Controller
```

### Learned

Instead of:

```sql
RETURNING *
```

Return only required columns.

Reason:

- Better Security
- Smaller Response
- Follow Principle of Least Privilege

---

# ⚙️ Service Layer

## Implemented Register Business Logic

### Flow

```text
Receive User

↓

Check Existing User

↓

User Exists?

↓

YES
↓

Throw Error

↓

NO

↓

Hash Password

↓

Create New User Object

↓

Call createUser()

↓

Return Created User
```

---

## Password Hashing

Implemented:

```typescript
bcrypt.hash(password,10)
```

### Learned

- Never store plain passwords.
- Always hash passwords before inserting into the database.
- Salt Rounds used:

```
10
```

---

## Created New Object

Instead of:

```typescript
user.password = hashedPassword;
```

Created:

```typescript
const userWithHashedPassword = {
    ...user,
    password: hashedPassword
}
```

### Reason

- Avoid Object Mutation
- Better Readability
- Safer Design

---

# 📝 TypeScript

Created shared interface.

```
src/types/user.types.ts
```

Example

```typescript
export interface User{
    name:string;
    email:string;
    password:string;
}
```

---

## Learned

Because of:

```json
"verbatimModuleSyntax": true
```

Need:

```typescript
import type { User } from "...";
```

instead of

```typescript
import { User } from "...";
```

---

# 🌐 Express Routing

Understood routing hierarchy.

```text
app.ts

↓

index.ts

↓

auth.routes.ts

↓

Controller
```

---

## Learned Difference

### router.post()

Used to handle an HTTP Request.

Example

```text
POST /register
```

---

### router.use()

Used to mount another Router.

Example

```text
/auth
```

---

## Final Route

```http
POST
/api/v1/auth/register
```

---

# ⚙️ Configuration

Resolved TypeScript configuration issue.

Changed

```json
"module":"nodenext"
```

to

```json
"module":"NodeNext"
```

---

# 🧪 Testing

## Tested Using Postman

Endpoint

```http
POST
/api/v1/auth/register
```

Request

```json
{
    "name":"sreeraj",
    "email":"sreeraj@gmail.com",
    "password":"Sreeraj@123"
}
```

Response

```json
{
    "message":"User Created Successfully",
    "data":{
        "id":5,
        "name":"sreeraj",
        "email":"sreeraj@gmail.com"
    }
}
```

Status

```
201 Created
```

---

# 🛢️ PostgreSQL Verification

Verified database manually.

Confirmed:

- User inserted successfully.
- Password stored as bcrypt hash.
- Plain password was never stored.

---

# 📚 Concepts Learned Today

- Layered Architecture
- Controller → Service → Repository
- Repository Pattern
- Business Logic Separation
- Parameterized SQL Queries
- PostgreSQL RETURNING
- Password Hashing (bcrypt)
- Shared TypeScript Interfaces
- Type-only Imports
- router.use() vs router.post()
- API Versioning
- Returning Selected Columns
- End-to-End API Flow

---

# ⚠️ Difficulties Faced

## 1. Passing Data Between Layers

Initially confused about how data flows.

### Understood Flow

```text
Controller

↓

Service

↓

Repository(email)
```

---

## 2. Repository Return Value

Initially thought repository should throw error if user not found.

Learned:

```
Repository

↓

Return Database Result

↓

Service

↓

Business Decision
```

---

## 3. throw Error()

Initially confused about how Controller receives the error.

Learned:

```text
throw Error()

↓

Stops Current Function

↓

Moves to Nearest Catch Block
```

---

## 4. router.post() vs router.use()

Understood:

```
router.post()

↓

HTTP Request Handler
```

```
router.use()

↓

Mount Another Router
```

---

## 5. PostgreSQL RETURNING

Learned why INSERT alone doesn't return inserted rows.

---

## 6. bcrypt Type Error

Solved by installing

```bash
npm install --save-dev @types/bcrypt
```

---

## 7. Type-only Imports

Learned why

```typescript
import type
```

is required.

---

# 🏆 Biggest Achievement

Successfully built and tested the **first complete Backend API**.

The Register API now:

- Receives client requests.
- Checks existing users.
- Hashes passwords.
- Inserts user into PostgreSQL.
- Returns created user.
- Stores passwords securely.

---

# 🚀 Next Session Plan

## Register API Improvements

- Global Error Handler
- Proper HTTP Status Codes
- Request Validation
- Remove Repetitive try/catch

---

## Login API

Topics to Learn

- bcrypt.compare()
- JWT
- Access Tokens
- Authentication Middleware

---

# 📈 Backend Progress

```text
Project Setup                  ██████████ 100%

Environment Configuration      ██████████ 100%

Database Configuration         ██████████ 100%

Express Architecture           ██████████ 100%

Register API                   ██████████ 100%

Login API                      ░░░░░░░░░░   0%

JWT Authentication             ░░░░░░░░░░   0%

Protected Routes               ░░░░░░░░░░   0%

Role Authorization             ░░░░░░░░░░   0%

Deployment                     ░░░░░░░░░░   0%
```

---

# 💭 Mentor Notes

## What Improved Today

- Started thinking in terms of architecture instead of syntax.
- Understood why each layer exists.
- Asked design-oriented questions instead of implementation-only questions.
- Successfully implemented the complete Register API independently with guidance.

---

# 🎯 Session Outcome

✅ First production-style Register API completed successfully.

**Status:** Completed ✅

**Next Milestone:** Build a production-ready Login API with JWT Authentication.

---

# Backend Authentication Service — 7 August 2026

> [!summary]  
> **Session Focus:** Global Error Handling + Login Authentication Fundamentals

---

## 1. Custom `AppError`

Created a custom error class to represent application/business errors with an HTTP status code.

```ts
export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
        this.name = "AppError";
    }
}
```

### Why `AppError`?

Normal JavaScript `Error` mainly provides the error message.

Our backend also needs an HTTP status code:

```text
message    → "User already exists"
statusCode → 409
```

So `AppError` allows us to keep both together:

```text
AppError
├── message
└── statusCode
```

---

## 2. Inheritance

```ts
class AppError extends Error
```

Means:

```text
Error
  ↑
AppError
```

`AppError` inherits functionality from JavaScript's built-in `Error` class.

### Key Idea

`extends` is used when one class needs to inherit properties and methods from another class.

```ts
class Child extends Parent
```

In our case:

```ts
class AppError extends Error
```

Therefore:

```text
AppError
   │
   ├── inherits Error functionality
   │
   ├── message
   ├── name
   └── stack
       
   + custom property
       └── statusCode
```

---

## 3. `super()`

```ts
super(message);
```

Because `AppError` extends `Error`, `super()` calls the parent `Error` constructor and initializes the error with the message.

```ts
constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
}
```

### Concept

```text
AppError constructor
        ↓
super(message)
        ↓
Error constructor
        ↓
Error message initialized
```

Without calling `super()` in a derived class constructor, JavaScript will not allow us to use `this`.

---

## 4. `this`

```ts
this.statusCode = statusCode;
```

Here:

```text
statusCode
    ↓
constructor parameter

this.statusCode
    ↓
property of the current AppError object
```

For example:

```ts
new AppError("User already exists", 409);
```

creates an object conceptually like:

```text
AppError Object
├── message: "User already exists"
├── statusCode: 409
└── name: "AppError"
```

### Important

`this` refers to the **current object instance**.

---

# Global Error Handling

## 5. Why Global Error Handling?

Initially, the controller handled errors using:

```ts
try {
    ...
} catch (error) {
    ...
}
```

If every controller does this, the same error-handling logic gets repeated.

For example:

```text
Register Controller
    ↓
try/catch

Login Controller
    ↓
try/catch

Profile Controller
    ↓
try/catch

Product Controller
    ↓
try/catch
```

This creates duplicated logic.

Instead, we created one centralized middleware:

```text
src/
└── middlewares/
    └── error.middleware.ts
```

This allows all errors to be handled in one place.

### Before

```text
Controller
   │
   ├── Business Logic
   │
   └── try/catch
```

### After

```text
Controller
   │
   └── Business Logic
            │
            ▼
       throw error
            │
            ▼
    Global Error Middleware
```

This keeps controllers cleaner and makes error handling consistent.

---

# Error Middleware

## 6. Error Middleware Signature

Normal Express middleware:

```ts
(req, res, next)
```

Error-handling middleware:

```ts
(error, req, res, next)
```

The additional first parameter is the error.

Express recognizes the four-parameter signature as an error-handling middleware.

### Normal Middleware

```text
(req, res, next)
```

### Error Middleware

```text
(error, req, res, next)
   ↑
error parameter
```

The position of `error` is important.

---

## 7. Why `next` Is Present

Even if our error handler doesn't directly use `next`, we keep:

```ts
(error, req, res, next)
```

because this is the expected Express error-handling middleware signature.

Example:

```ts
export const errorHandler = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // error handling logic
};
```

The four parameters tell Express:

> "This middleware is an error-handling middleware."

---

# TypeScript Error Handling

## 8. Why `error: unknown`?

We cannot assume that every error is an `AppError`.

The application could encounter:

```text
AppError
Error
TypeError
SyntaxError
ReferenceError
...
```

Therefore:

```ts
error: unknown
```

is safer.

### Why not `AppError`?

Because this would incorrectly assume that every possible error is an `AppError`:

```ts
error: AppError
```

But errors can come from many different sources.

For example:

```text
Database error
    ↓
Error

Invalid JavaScript operation
    ↓
TypeError

Invalid syntax
    ↓
SyntaxError

Our business logic
    ↓
AppError
```

Therefore:

```ts
error: unknown
```

is the safer approach.

---

## 9. `instanceof`

We check:

```ts
if (error instanceof AppError) {
    ...
}
```

This performs **type narrowing**.

Before:

```text
error → unknown
```

After checking:

```ts
error instanceof AppError
```

TypeScript understands inside the block that:

```text
error → AppError
```

Therefore, we can safely access:

```ts
error.message
error.statusCode
```

### Concept

```text
error
  │
  ▼
unknown
  │
  │ instanceof AppError
  ▼
AppError
  │
  ├── message
  └── statusCode
```

---

# Error Handler Logic

The overall logic is:

```text
Error
  ↓
Is it AppError?
  ├── YES → use statusCode + message
  │
  └── NO  → 500 Internal Server Error
```

### Business Error

Example:

```text
409 Conflict
User already exists
```

This is an expected application/business error.

### Unexpected Error

Example:

```text
500 Internal Server Error
```

This represents an unexpected server-side failure.

---

## Example Error Handling Logic

Conceptually:

```ts
if (error instanceof AppError) {
    return res.status(error.statusCode).json({
        message: error.message
    });
}

return res.status(500).json({
    message: "Internal Server Error"
});
```

### Flow

```text
                    Error
                      │
                      ▼
             instanceof AppError?
                  /       \
                YES        NO
                 │          │
                 ▼          ▼
          statusCode       500
          + message        +
                            "Internal Server Error"
```

---

# Middleware Order

## 10. Application Middleware Order

The application follows this order:

```ts
app.use(express.json());

app.use("/api/v1", router);

app.use(errorHandler);
```

The order is important.

### Normal Request Flow

```text
Client
  ↓
express.json()
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

### Error Flow

```text
Service
  ↓
throw AppError
  ↓
Express
  ↓
Global Error Middleware
  ↓
Client
```

The error handler is registered **after the routes**.

---

## Why Must Error Middleware Come Last?

Express processes middleware in the order it is registered.

Therefore:

```ts
app.use(express.json());

app.use("/api/v1", router);

app.use(errorHandler);
```

means:

```text
1. Parse JSON
        ↓
2. Process routes
        ↓
3. If an error reaches Express
        ↓
4. Global error handler
```

If a route throws an error:

```text
Route
  ↓
throw AppError
  ↓
Express
  ↓
errorHandler
```

---

# Express 5

## 11. Express Version

Project version:

```text
Express 5.2.1
```

Express 5 automatically forwards rejected promises/errors from async route handlers to the error-handling middleware.

Therefore, we don't need an `asyncHandler` wrapper **just for async error forwarding**.

### Flow

```text
Async Controller
      ↓
Promise rejected / Error thrown
      ↓
Express 5
      ↓
Error Middleware
```

### Important

This does not mean that all errors magically disappear.

It means Express 5 handles the forwarding of errors from asynchronous route handlers to the error middleware.

---

# Controller Refactoring

## 12. Removing `try/catch` From Controllers

After implementing the global error handler, the controller no longer needs:

```ts
try {
    ...
} catch (error) {
    ...
}
```

for the purpose of forwarding errors to the global handler.

The controller's responsibility becomes:

```text
Receive Request
      ↓
Call Service
      ↓
Return Success Response
```

Errors are handled centrally by the global error middleware.

---

## Controller Responsibility

```text
Controller
│
├── Receive request
│
├── Extract required data
│
├── Call service
│
└── Return response
```

The controller does **not** import `errorHandler`.

### Architecture

```text
Controller
     │
     ▼
Service
     │
     ├── Success → Controller → Response
     │
     └── Error → Express → Global Error Middleware
```

---

# Login Module Started

After completing the Register API and global error handling, we started the Login API.

## 13. Login Flow

```text
Client
  ↓
Controller
  ↓
Service
  ↓
existingUser(email)
  ↓
Fetch User
  ↓
Get Stored Password Hash
  ↓
bcrypt.compare()
  ↓
Password Correct?
```

More detailed flow:

```text
Login Request
      │
      ▼
Login Controller
      │
      ▼
Login Service
      │
      ▼
Find User by Email
      │
      ▼
User Found?
      │
      ▼
Get Stored Password Hash
      │
      ▼
bcrypt.compare()
      │
      ▼
Password Correct?
```

---

# `bcrypt.hash()` vs `bcrypt.compare()`

## 14. Registration

During registration:

```text
Plain Password
      ↓
bcrypt.hash()
      ↓
Hashed Password
      ↓
Database
```

Example:

```text
Kaushika123
     ↓
bcrypt.hash()
     ↓
$2b$10$........
     ↓
PostgreSQL
```

The original password is not stored in the database.

---

## 15. Login

During login:

```text
Plain Password
      ↓
bcrypt.compare()
      ↓
Stored Hash
      ↓
true / false
```

Example:

```text
Entered Password
      ↓
Kaushika123

Stored Password Hash
      ↓
$2b$10$abc........
```

Then:

```ts
bcrypt.compare(
    enteredPassword,
    storedPasswordHash
);
```

returns:

```text
true  → Correct password
false → Incorrect password
```

---

# Important bcrypt Concept

> [!important]  
> **`bcrypt.compare()` does NOT decrypt the stored password.**

It does **not** do:

```text
Hash
 ↓
Decrypt
 ↓
Plain Password
```

Instead, bcrypt verifies whether the supplied plaintext password corresponds to the stored bcrypt hash.

### Correct Mental Model

```text
Entered Password
      │
      ▼
bcrypt.compare()
      │
      │
Stored Hash ──────┘
      │
      ▼
Verification
      │
   ┌──┴──┐
   ▼     ▼
 true   false
```

The stored password hash is never converted back into the original plaintext password.

---

# Example: Login Password Verification

Suppose the user registered with:

```text
email: kaushika@gmail.com
password: Kaushika123
```

## During Registration

```text
Kaushika123
      ↓
bcrypt.hash()
      ↓
$2b$10$abc........
      ↓
Database
```

The database stores:

```text
$2b$10$abc........
```

It does **not** store:

```text
Kaushika123
```

---

## During Login

The user sends:

```text
email: kaushika@gmail.com
password: Kaushika123
```

Repository finds the user:

```text
email: kaushika@gmail.com
password: $2b$10$abc........
```

The Service now has two values:

```text
Entered Password
      ↓
Kaushika123

Stored Password Hash
      ↓
$2b$10$abc........
```

Then:

```ts
bcrypt.compare(
    enteredPassword,
    storedPasswordHash
);
```

returns:

```text
true
```

because the entered password matches the stored hash.

---

# bcrypt Salt

## 16. Why Same Password Can Produce Different Hashes

The same password can produce different bcrypt hashes:

```text
Password: 123456

Hash #1 → $2b$10$AAA...
Hash #2 → $2b$10$BBB...
```

This happens because bcrypt uses a **random salt**.

### Concept

```text
Same Password
      │
      ├──────────────┐
      ▼              ▼
 Random Salt #1   Random Salt #2
      │              │
      ▼              ▼
   bcrypt          bcrypt
      │              │
      ▼              ▼
   Hash #1         Hash #2
```

Therefore:

```text
Same password
      ≠
Same bcrypt hash
```

---

## Why Not Hash Again During Login?

We should not simply do:

```text
Login Password
      ↓
bcrypt.hash()
      ↓
New Hash
      ↓
Compare with stored hash
```

because a new random salt would normally produce a different hash.

Instead, use:

```text
Login Password
      +
Stored Hash
      ↓
bcrypt.compare()
      ↓
true / false
```

---

# Main Difficulties We Faced

## Difficulty 1 — Understanding `AppError`

### Question

Why not just use:

```ts
Error
```

?

### Understanding

Normal `Error` provides error information such as the message.

Our application also needs an HTTP status code.

`AppError` allows us to carry:

```text
message + statusCode
```

together.

Example:

```text
AppError
├── message: "User already exists"
└── statusCode: 409
```

---

## Difficulty 2 — Understanding `super()`

We had to understand why:

```ts
super(message);
```

is required when extending the built-in `Error` class.

### Understanding

```text
AppError
   ↓
extends Error
   ↓
super(message)
   ↓
parent Error constructor
```

`super()` initializes the inherited part of the object.

---

## Difficulty 3 — Understanding `this`

Understanding:

```ts
this.statusCode = statusCode;
```

where:

```text
statusCode
→ constructor parameter

this.statusCode
→ property of the current object
```

Example:

```ts
new AppError("User already exists", 409);
```

Conceptually:

```text
Current AppError Object
├── message: "User already exists"
└── statusCode: 409
```

---

## Difficulty 4 — Understanding `instanceof`

Why not simply write:

```ts
error: AppError
```

?

Because not every error is necessarily an `AppError`.

Instead:

```ts
error: unknown
```

Then:

```ts
error instanceof AppError
```

allows us to determine whether the error is specifically an `AppError`.

### Flow

```text
unknown error
      ↓
instanceof AppError?
      │
   ┌──┴──┐
   ▼     ▼
  YES    NO
   │      │
   ▼      ▼
AppError  Unknown Error
```

---

## Difficulty 5 — Understanding Global Error Middleware

Initially, errors were handled inside controllers.

We changed the architecture to:

```text
Service
  ↓
throw AppError
  ↓
Express
  ↓
Global Error Middleware
  ↓
Response
```

### Benefit

Instead of repeating error handling in every controller:

```text
Controller 1 → try/catch
Controller 2 → try/catch
Controller 3 → try/catch
Controller 4 → try/catch
```

we now have:

```text
All Controllers
      ↓
Global Error Middleware
```

This makes the architecture cleaner and more maintainable.

---

## Difficulty 6 — Understanding Middleware Order

Correct order:

```text
express.json()
      ↓
routes
      ↓
errorHandler
```

In code:

```ts
app.use(express.json());

app.use("/api/v1", router);

app.use(errorHandler);
```

The error handler is registered once after the routes.

### Why?

Express processes middleware in order.

```text
Request
  ↓
express.json()
  ↓
router
  ↓
errorHandler
```

---

## Difficulty 7 — Understanding `bcrypt.compare()`

### Main Confusion

> How can `Kaushika123` be compared with `$2b$10$...`?

### Understanding

`bcrypt.compare()` does **not decrypt** the hash.

It verifies the supplied password against the stored bcrypt hash using the information contained in the hash.

```text
Entered Password
      +
Stored bcrypt hash
      ↓
bcrypt.compare()
      ↓
Verification
      ↓
true / false
```

---

# Key Takeaways

|Concept|Purpose|
|---|---|
|`AppError`|Custom application/business error|
|`extends Error`|Error inheritance|
|`super()`|Initialize parent `Error`|
|`this`|Access current object|
|`instanceof`|Check error type + type narrowing|
|`unknown`|Safely type unknown errors|
|Error Middleware|Centralized error handling|
|`app.use()`|Register middleware/routes|
|Express 5|Automatic async error forwarding|
|`bcrypt.hash()`|Hash password during registration|
|`bcrypt.compare()`|Verify password during login|
|Salt|Makes bcrypt hashes different even for the same password|

---

# Final Architecture

## Complete Backend Flow

```text
                         CLIENT
                           │
                           ▼
                    express.json()
                           │
                           ▼
                         ROUTES
                           │
                           ▼
                      CONTROLLER
                           │
                           ▼
                        SERVICE
                    Business Logic
                           │
                           ▼
                      REPOSITORY
                    Database Logic
                           │
                           ▼
                       PostgreSQL
```

---

# Error Flow

```text
                         CLIENT
                           │
                           ▼
                         ROUTE
                           │
                           ▼
                      CONTROLLER
                           │
                           ▼
                        SERVICE
                           │
                           │
                     throw AppError
                           │
                           ▼
                        Express 5
                           │
                           ▼
               Global Error Middleware
                           │
                    ┌──────┴──────┐
                    ▼             ▼
                AppError      Other Error
                    │             │
                    ▼             ▼
             statusCode +       500
                message          │
                    │             │
                    └──────┬──────┘
                           ▼
                         CLIENT
```

---

# Login Flow

```text
                         CLIENT
                           │
                           │
                    email + password
                           │
                           ▼
                    Login Controller
                           │
                           ▼
                     Login Service
                           │
                           ▼
                  Find User by Email
                           │
                           ▼
                    User Found?
                           │
                           ▼
                Get Stored Password Hash
                           │
                           ▼
                    bcrypt.compare()
                           │
                           ▼
                  Password Correct?
                      /           \
                    YES            NO
                     │              │
                     ▼              ▼
              Generate JWT      401 Error
                     │
                     ▼
               Access Token
                     │
                     ▼
              Login Response
```

---

# Registration vs Login Password Flow

## Registration

```text
User Password
      │
      ▼
bcrypt.hash()
      │
      ▼
Password Hash
      │
      ▼
Database
```

## Login

```text
User Password
      │
      │
      ├──────────────┐
      │              │
      ▼              ▼
Entered Password   Stored Hash
      │              │
      └──────┬───────┘
             ▼
      bcrypt.compare()
             │
         ┌───┴───┐
         ▼       ▼
       true     false
         │       │
         ▼       ▼
      Login    401 Error
```

---

# What We Learned on 7 August 2026

### Backend Architecture

- How to create a custom `AppError`.
    
- How inheritance works using `extends`.
    
- Why `super()` is required when extending `Error`.
    
- How `this` refers to the current object.
    
- How to implement centralized/global error handling.
    
- How Express identifies error middleware using four parameters.
    
- Why `error` should be typed as `unknown`.
    
- How `instanceof` performs runtime checking and TypeScript type narrowing.
    
- Why error middleware should be registered after routes.
    
- How Express 5 forwards rejected promises/errors from async route handlers.
    
- Why controllers can be kept clean without repetitive `try/catch` blocks.
    

### Authentication

- Started implementing the Login API.
    
- Understood the difference between `bcrypt.hash()` and `bcrypt.compare()`.
    
- Learned that bcrypt hashes cannot be decrypted to retrieve the original password.
    
- Understood how password verification works.
    
- Learned why bcrypt uses salts.
    
- Understood why hashing the login password again is not the correct verification method.
    
- Learned that `bcrypt.compare()` should be used to verify login passwords.
    

---

# 🚀 Next Session

## JWT Authentication

Next major topic:

```text
bcrypt.compare()
       ↓
Successful Login
       ↓
JWT Generation
       ↓
Access Token
       ↓
Login Response
```

### Expected Login Architecture

```text
Login Request
      ↓
Find User
      ↓
Verify Password
      ↓
bcrypt.compare()
      ↓
Password Correct?
      │
      ▼
Generate JWT
      │
      ▼
Access Token
      │
      ▼
Send Token to Client
```

> [!note]  
> **Next major topic: JWT Authentication**

---

# Session Summary

> [!success]  
> **7 August 2026 — Completed**
> 
> - Custom `AppError`
>     
> - Global Error Middleware
>     
> - TypeScript `unknown` + `instanceof`
>     
> - Express middleware ordering
>     
> - Express 5 async error handling
>     
> - Controller error-handling refactoring
>     
> - Login API fundamentals
>     
> - `bcrypt.hash()`
>     
> - `bcrypt.compare()`
>     
> - bcrypt salts
>     
> - Password verification fundamentals
>     

> [!tip]  
> **Next:** Implement JWT generation after successful password verification and complete the Login API.

---

# Backend Authentication Service — 9 August 2026

> [!summary]  
> **Session Focus:** JWT Generation + Authentication Middleware Fundamentals

---

# 📅 Today — 9 August 2026

We completed the **JWT generation** part of the Login flow and started the **JWT Authentication Middleware**.

---

# ✅ Completed

The following parts of the authentication system are now completed:

```text
Registration                    ✅
Password hashing                ✅
Login validation                ✅
bcrypt.compare()                ✅
JWT secret configuration        ✅
JWT expiration                  ✅
JWT generation                  ✅
JWT returned from API           ✅
```

### Current Login Flow

```text
Client
  ↓
Login Request
  ↓
Controller
  ↓
Service
  ↓
Find User
  ↓
bcrypt.compare()
  ↓
Password Correct?
  ↓
Generate JWT
  ↓
Return JWT
  ↓
Client
```

---

# 🔐 JWT Generation

After successfully verifying the user's password using:

```ts
bcrypt.compare()
```

the server generates a JWT.

The JWT is generated using:

```ts
jwt.sign()
```

Conceptually:

```text
User Login
    ↓
Email + Password
    ↓
Find User
    ↓
bcrypt.compare()
    ↓
Password Correct
    ↓
jwt.sign()
    ↓
JWT
    ↓
Return JWT to Client
```

---

# 🎫 Login API Response

The Login API is successfully returning:

```json
{
  "message": "User Successfully logged in",
  "data": "<JWT>"
}
```

The `<JWT>` represents the access token generated by the server.

The client can store/use this token for subsequent authenticated API requests.

---

# 🧩 JWT Structure

A JSON Web Token consists of three main parts:

```text
HEADER.PAYLOAD.SIGNATURE
```

Conceptually:

```text
┌──────────────┬───────────────┬────────────────┐
│    HEADER    │    PAYLOAD    │    SIGNATURE   │
└──────────────┴───────────────┴────────────────┘
```

Each section is separated by a `.`.

Example structure:

```text
xxxxx.yyyyy.zzzzz
  ↑      ↑      ↑
Header Payload Signature
```

---

# 1. Header

The **Header** contains information about the token.

```text
HEADER
  ↓
Algorithm + Token Type
```

Typical information includes:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### `alg`

Specifies the signing algorithm.

Example:

```text
HS256
```

### `typ`

Specifies the token type.

Usually:

```text
JWT
```

---

# 2. Payload

The **Payload** contains information, called **claims**, about the user or token.

In our application, we are primarily storing:

```text
PAYLOAD
   ↓
User Information
   ↓
userId
```

For example:

```json
{
  "userId": 123
}
```

The payload may also contain registered claims such as:

```text
iat → Issued At
exp → Expiration Time
```

---

# ⚠️ JWT Payload Is Not Encrypted

An important concept:

> [!important]  
> **JWT payload is encoded, not encrypted.**

Therefore, anyone who obtains the token can decode and read the payload.

For example:

```text
JWT
 ↓
Decode
 ↓
Payload
 ↓
{
  "userId": 123
}
```

### Therefore, NEVER store sensitive information such as:

```text
❌ Password
❌ Password Hash
❌ Credit Card Information
❌ API Secrets
❌ Private Keys
❌ Other Sensitive Data
```

The JWT payload should contain only the information necessary for authentication/authorization.

---

# 3. Signature

The **Signature** is used to verify that the token was created by a trusted server and that its signed contents have not been altered.

Conceptually:

```text
SIGNATURE
    ↓
Created / Verified using
Server Secret
```

For a symmetric algorithm such as HS256:

```text
Header + Payload
       +
Server Secret
       ↓
   Signature
```

The server keeps the secret private.

---

# 🔑 JWT Secret

The JWT secret is a sensitive server-side value used when signing and verifying tokens.

Conceptually:

```text
                 SERVER
                   │
          JWT_SECRET_KEY
                   │
            ┌──────┴──────┐
            ▼             ▼
       jwt.sign()    jwt.verify()
            │             │
            ▼             ▼
        Generate       Validate
          JWT            JWT
```

### Important

The secret:

```text
❌ Should NOT be returned to the client
❌ Should NOT be placed inside the JWT payload
❌ Should NOT be committed to Git
```

It should remain securely configured on the server, typically through environment variables.

Example:

```env
JWT_SECRET_KEY=your-secret-value
```

---

# ⏳ JWT Expiration

JWTs should have an expiration time.

Conceptually:

```text
JWT
 ↓
Issued At
 ↓
Valid for a limited period
 ↓
Expiration
 ↓
Token becomes invalid
```

Example:

```text
JWT issued
    ↓
Valid
    ↓
Expiration time reached
    ↓
Token rejected
```

This reduces the security impact if a token is compromised.

---

# 🛠️ JWT Functions Learned

## `jwt.sign()`

`jwt.sign()` is used to generate/sign a JWT.

Conceptually:

```text
Payload
   +
Secret
   ↓
jwt.sign()
   ↓
JWT
```

Example concept:

```ts
jwt.sign(payload, JWT_SECRET_KEY, options)
```

The resulting token is returned to the client.

---

## `jwt.verify()`

`jwt.verify()` will be used to validate an incoming JWT.

Conceptually:

```text
JWT
 +
JWT_SECRET_KEY
 ↓
jwt.verify()
 ↓
Valid / Invalid
```

It verifies the token's signature and checks relevant registered claims such as expiration.

---

# 🔄 Complete JWT Authentication Concept

```text
                 LOGIN
                   │
                   ▼
          Email + Password
                   │
                   ▼
             Find User
                   │
                   ▼
          bcrypt.compare()
                   │
                   ▼
          Password Correct?
              /         \
            NO           YES
            │             │
            ▼             ▼
          401        jwt.sign()
                          │
                          ▼
                         JWT
                          │
                          ▼
                   Return to Client
```

After login:

```text
Client
  │
  │ Stores/uses JWT
  ▼
Subsequent API Request
```

---

# 🚧 Where We Stopped

We started implementing the **Authentication Middleware**.

The purpose of this middleware is to protect routes that require an authenticated user.

For example:

```text
GET /api/v1/profile
GET /api/v1/orders
GET /api/v1/cart
```

The client must provide a valid JWT before accessing these protected resources.

---

# 🔐 Authentication Middleware

The expected future request flow is:

```text
Client
  ↓
Authorization: Bearer <JWT>
  ↓
Authentication Middleware
  ↓
Extract Token
  ↓
jwt.verify(token, JWT_SECRET_KEY)
  ↓
Valid?
 ├── YES → next()
 └── NO  → 401 Unauthorized
```

---

# 📡 Authorization Header

The client sends the JWT using the HTTP `Authorization` header.

Format:

```http
Authorization: Bearer <JWT>
```

Example:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

The important structure is:

```text
Authorization:
       ↓
Bearer <JWT>
```

---

# 🔍 Extracting the Token

The middleware receives:

```text
Authorization: Bearer <JWT>
```

Conceptually:

```text
Authorization Header
        ↓
"Bearer <JWT>"
        ↓
Extract JWT
        ↓
<JWT>
```

The middleware then passes the extracted token to:

```ts
jwt.verify(token, JWT_SECRET_KEY)
```

---

# ✅ Token Verification

The important operation is:

```ts
jwt.verify(token, JWT_SECRET_KEY)
```

This is where the JWT library performs the cryptographic verification.

### Important Correction

We **do not manually**:

```text
❌ Split the JWT
❌ Decode the signature manually
❌ Recreate the signature ourselves
❌ Compare the signature string with the secret
```

Instead:

```text
JWT
 ↓
jwt.verify(token, JWT_SECRET_KEY)
 ↓
jsonwebtoken performs verification
 ↓
Valid / Invalid
```

---

# 🧠 Important JWT Mental Model

The secret is **not the signature**.

Instead:

```text
JWT_SECRET_KEY
      +
Header + Payload
      ↓
Signing Algorithm
      ↓
Signature
```

During verification:

```text
Received JWT
      +
JWT_SECRET_KEY
      ↓
jsonwebtoken
      ↓
Cryptographic Verification
      ↓
Valid / Invalid
```

Therefore, the server does not simply compare:

```text
signature === secret
```

That is **not how JWT verification works**.

---

# Middleware Decision

After:

```ts
jwt.verify(token, JWT_SECRET_KEY)
```

there are two possible outcomes.

## Valid Token

```text
JWT
 ↓
jwt.verify()
 ↓
Valid
 ↓
next()
 ↓
Controller
 ↓
Service
 ↓
Database
 ↓
Response
```

The request is allowed to continue.

---

## Invalid Token

```text
JWT
 ↓
jwt.verify()
 ↓
Invalid / Expired
 ↓
401 Unauthorized
```

The request should not reach the protected controller.

---

# 🛡️ Protected Route Architecture

Without authentication:

```text
Client
  ↓
Route
  ↓
Controller
  ↓
Service
  ↓
Database
```

With authentication:

```text
Client
  ↓
Route
  ↓
Authentication Middleware
  ↓
jwt.verify()
  ↓
Valid?
  │
  ├── NO → 401 Unauthorized
  │
  └── YES
       ↓
     next()
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

# 🧩 Authentication vs Authorization

A useful distinction going forward:

### Authentication

> **Who are you?**

JWT authentication verifies that the request contains a valid token representing an authenticated user.

```text
JWT
 ↓
Valid?
 ↓
User is authenticated
```

### Authorization

> **What are you allowed to do?**

Authorization determines whether an authenticated user has permission to perform a particular action.

Example:

```text
Authenticated User
        ↓
Is Admin?
   /         \
 YES         NO
 ↓            ↓
Allow       Deny
```

Authentication will be implemented first.

Authorization can be added later.

---

# 📊 Current Project Progress

```text
┌──────────────────────────────────────┐
│       BACKEND AUTHENTICATION         │
├──────────────────────────────────────┤
│ Registration                  ✅     │
│ Password Hashing              ✅     │
│ Global Error Handling         ✅     │
│ Login Validation              ✅     │
│ bcrypt.compare()              ✅     │
│ JWT Secret Configuration      ✅     │
│ JWT Expiration                ✅     │
│ JWT Generation                ✅     │
│ JWT API Response              ✅     │
│ Authentication Middleware     🚧     │
│ JWT Verification              🚧     │
│ Protected Routes              ⏳     │
└──────────────────────────────────────┘
```

---

# 🧠 Understanding Check

Your understanding of JWT generation and authentication was approximately:

> [!success]  
> **9/10**

The main correction was:

> [!important]  
> We **do not manually split the JWT and compare its signature with the secret**.

Instead, use:

```ts
jwt.verify(token, JWT_SECRET_KEY)
```

The `jsonwebtoken` library handles the cryptographic verification.

---

# 🔄 Complete Authentication Architecture

The architecture is now evolving into:

```text
                           CLIENT
                              │
                    ┌─────────┴─────────┐
                    │                   │
                 Register              Login
                    │                   │
                    ▼                   ▼
                Controller          Controller
                    │                   │
                    ▼                   ▼
                 Service             Service
                    │                   │
                    ▼                   ▼
              Password Hash       bcrypt.compare()
                    │                   │
                    ▼                   ▼
                Database             jwt.sign()
                                        │
                                        ▼
                                       JWT
                                        │
                                        ▼
                                     CLIENT
                                        │
                         Authorization: Bearer <JWT>
                                        │
                                        ▼
                              Protected API Request
                                        │
                                        ▼
                            Authentication Middleware
                                        │
                                        ▼
                                  jwt.verify()
                                   /        \
                                Invalid     Valid
                                  │           │
                                  ▼           ▼
                                401         next()
                                              │
                                              ▼
                                         Controller
                                              │
                                              ▼
                                           Service
                                              │
                                              ▼
                                         Repository
                                              │
                                              ▼
                                         PostgreSQL
```

---

# 📝 Key Takeaways

|Concept|Purpose|
|---|---|
|`jwt.sign()`|Generates/signs a JWT|
|`jwt.verify()`|Verifies a JWT|
|JWT Header|Contains token metadata such as algorithm and type|
|JWT Payload|Contains claims/user information|
|JWT Signature|Provides integrity/authenticity verification|
|JWT Secret|Server-side secret used for signing/verifying|
|JWT Expiration|Limits how long a token remains valid|
|`Authorization` Header|Carries the access token|
|`Bearer`|Indicates the authentication scheme|
|Authentication Middleware|Protects routes by validating JWTs|
|`next()`|Allows a valid request to continue|
|`401 Unauthorized`|Used when authentication fails|

---

# 🚀 Next Session

## JWT Authentication Middleware

Continue from:

```text
Authorization: Bearer <JWT>
              ↓
       Extract JWT
              ↓
jwt.verify(token, JWT_SECRET_KEY)
              ↓
        ┌─────┴─────┐
        ▼           ▼
      Valid       Invalid
        │           │
        ▼           ▼
     next()        401
        │
        ▼
   Controller
```

### Next Concepts to Complete

```text
1. Extract JWT from Authorization header
        ↓
2. Validate Bearer format
        ↓
3. Call jwt.verify()
        ↓
4. Handle invalid/expired tokens
        ↓
5. Extract userId from JWT payload
        ↓
6. Attach authenticated user information
        ↓
7. Call next()
        ↓
8. Protect routes using middleware
```

> [!note]  
> **Next major topic: JWT Authentication Middleware → Protected Routes → Accessing the Authenticated User**

---

# Backend Authentication Service — 11 August 2026

> [!summary]  
> **Session Focus:** JWT Authentication Middleware + Protected Routes

---

# 🏁 End of Session — 11 August 2026

Today was a **big session**.

We completed the **JWT Authentication Middleware** and successfully protected an API route using JWT authentication.

This means the backend now has a working authentication flow from:

```text
Login
  ↓
JWT Generation
  ↓
Authorization Header
  ↓
Authentication Middleware
  ↓
JWT Verification
  ↓
req.user
  ↓
Protected API
```

---

# ✅ What We Completed

```text
JWT Generation                         ✅
JWT Expiration                         ✅
JWT Secret from .env                   ✅
JWT Authentication Middleware          ✅
Authorization Header                   ✅
Bearer Token Extraction                ✅
JWT Verification                       ✅
401 Unauthorized Handling              ✅
Express Request Type Extension         ✅
req.user                               ✅
Protected Route                        ✅
Valid JWT → API access                 ✅
Invalid JWT → 401 Unauthorized         ✅
```

---

# 🔐 JWT Authentication Middleware

The main achievement today was completing the authentication middleware.

The middleware is responsible for checking whether an incoming request contains a valid JWT.

The overall flow is:

```text
Client
  ↓
Authorization: Bearer <JWT>
  ↓
Authentication Middleware
  ↓
Extract Token
  ↓
jwt.verify()
  ↓
Valid?
 ├── YES → req.user → next()
 │
 └── NO  → 401 Unauthorized
```

---

# 🧠 Concepts Learned

## 1. Authorization Header

The client sends the JWT through the HTTP `Authorization` header.

The format is:

```http
Authorization: Bearer <JWT>
```

Example:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

The structure is:

```text
Authorization
      ↓
Bearer <JWT>
```

---

## 🔍 Bearer Token Extraction

The middleware needs to extract the actual JWT from:

```text
Bearer <JWT>
```

We learned how to use:

```ts
split(" ")
```

Conceptually:

```text
Header
  ↓
"Bearer <JWT>"
  ↓
split(" ")
  ↓
[ "Bearer", "<JWT>" ]
  ↓
token = [1]
  ↓
<JWT>
```

### Example

```text
"Bearer abc123"
       ↓
split(" ")
       ↓
["Bearer", "abc123"]
       ↓
       [1]
       ↓
"abc123"
```

The first element is:

```text
[0] → "Bearer"
```

The second element is:

```text
[1] → JWT
```

---

# 2. `jwt.verify()`

The extracted JWT is passed to:

```ts
jwt.verify(token, JWT_SECRET_KEY)
```

Conceptually:

```text
JWT + JWT_SECRET_KEY
        ↓
   jwt.verify()
        ↓
 ┌──────┴──────┐
 ▼             ▼
Valid       Invalid/Expired
 │             │
 ▼             ▼
Decoded       Error
Payload
```

---

## What Happens When the JWT Is Valid?

If the JWT is valid:

```text
JWT
 ↓
jwt.verify()
 ↓
Decoded Payload
```

For example:

```json
{
  "userId": 5
}
```

The middleware can then use this information to identify the authenticated user.

---

## What Happens When the JWT Is Invalid?

If the JWT is:

- Invalid
    
- Tampered with
    
- Expired
    
- Signed with the wrong secret
    

then verification fails.

Conceptually:

```text
Invalid JWT
    ↓
jwt.verify()
    ↓
Error
    ↓
401 Unauthorized
```

---

# ⚠️ Important JWT Verification Concept

We **do not manually split the JWT into its three sections and verify the signature ourselves**.

We do **not** manually perform:

```text
JWT
 ↓
Split into:
 ├── Header
 ├── Payload
 └── Signature
       ↓
Manually compare signature
       ↓
Secret
```

Instead, the `jsonwebtoken` library handles the cryptographic verification.

We simply use:

```ts
jwt.verify(token, JWT_SECRET_KEY)
```

### Correct Mental Model

```text
Received JWT
      +
JWT_SECRET_KEY
      ↓
jwt.verify()
      ↓
jsonwebtoken performs verification
      ↓
Valid → decoded payload
Invalid → error
```

---

# 3. `express.d.ts`

Another important concept learned today was **TypeScript declaration merging**.

We needed Express's `Request` object to understand:

```ts
req.user
```

By default, Express's `Request` type doesn't know about our custom `user` property.

So we extended it.

Conceptually:

```text
Express Request
      +
user?: AuthUser
      ↓
Extended Express Request
      ↓
req.user is now recognized by TypeScript
```

---

# 🧩 Declaration Merging

The idea is:

```text
Existing Express Request
        │
        │ declaration merging
        ▼
Extended Request
        │
        └── user?: AuthUser
```

This allows TypeScript to understand:

```ts
req.user
```

instead of reporting an error such as:

```text
Property 'user' does not exist on type 'Request'
```

---

# ⚠️ Important Distinction

One of the most important concepts learned today:

```text
express.d.ts
    ↓
TypeScript information only
```

while:

```text
auth.middleware.ts
    ↓
Actual runtime behavior
```

These are two completely different responsibilities.

---

## `express.d.ts`

Responsible for telling TypeScript:

> "`Request` objects can have a `user` property."

Conceptually:

```text
TypeScript
    ↓
Knows about req.user
```

It does **not** actually create the property at runtime.

---

## `auth.middleware.ts`

Responsible for actually creating/assigning the property:

```text
JWT
 ↓
verify
 ↓
decoded payload
 ↓
req.user = ...
```

So:

```text
express.d.ts
    ↓
Compile-time/type information

auth.middleware.ts
    ↓
Runtime behavior
```

---

# 4. `req.user`

We learned an important distinction about where `req.user` comes from.

The client sends:

```text
Authorization: Bearer JWT
```

The client does **not** send:

```text
req.user
```

Instead, the authentication middleware creates it after successfully verifying the JWT.

The flow is:

```text
Client
    ↓
Authorization: Bearer JWT
    ↓
Authentication Middleware
    ↓
jwt.verify()
    ↓
Decoded Payload
    ↓
req.user = { userId: 5 }
    ↓
next()
    ↓
Controller
```

---

# 🔑 Trusted User Identity

This is an important security concept.

The authenticated identity should come from the **verified JWT**, not directly from client-controlled request data.

For example, we should not trust:

```text
req.body.userId
```

to determine who is authenticated.

Instead:

```text
JWT
 ↓
jwt.verify()
 ↓
decoded userId
 ↓
req.user.userId
```

The middleware establishes the authenticated identity.

---

# Example

Suppose the JWT payload contains:

```json
{
  "userId": 5
}
```

After successful verification:

```text
JWT
 ↓
jwt.verify()
 ↓
{ userId: 5 }
 ↓
req.user = { userId: 5 }
 ↓
next()
```

The controller can then access:

```text
req.user.userId
```

---

# 5. Protected Routes

We successfully created and tested a protected API route.

The route flow is:

```text
POST /profile
       ↓
authMiddleware
       ↓
JWT Verification
       ↓
Valid JWT
       ↓
Controller
       ↓
User Profile
```

---

# ✅ Valid JWT Test

When a valid JWT is provided:

```text
POST /profile
       ↓
Authorization: Bearer <valid JWT>
       ↓
authMiddleware
       ↓
jwt.verify()
       ↓
Valid
       ↓
next()
       ↓
Controller
       ↓
User Profile
```

Result:

```text
User Profile ✅
```

---

# ❌ Invalid JWT Test

When an invalid JWT is provided:

```text
POST /profile
       ↓
Authorization: Bearer <invalid JWT>
       ↓
authMiddleware
       ↓
jwt.verify()
       ↓
Invalid
       ↓
401 Unauthorized
```

Result:

```text
401 Unauthorized ✅
```

The request does not continue to the controller.

---

# 🛡️ Protected Route Architecture

The current protected route architecture is:

```text
Client
  ↓
Route
  ↓
Authentication Middleware
  ↓
Extract Bearer Token
  ↓
jwt.verify()
  ↓
Valid?
  │
  ├── NO
  │    ↓
  │   401 Unauthorized
  │
  └── YES
       ↓
    req.user
       ↓
     next()
       ↓
   Controller
       ↓
    Service
       ↓
  Repository
       ↓
  PostgreSQL
```

---

# ⚠️ One Thing To Fix Next Session

The current Profile Controller uses:

```ts
req.body
```

However, the authenticated user's identity should come from:

```ts
req.user
```

because `req.user` was established by our trusted JWT verification.

---

# Current Profile Flow

Currently:

```text
Profile Request
      ↓
req.body
      ↓
Profile Controller
```

We need to change it to:

```text
Profile Request
      ↓
Authentication Middleware
      ↓
JWT Verification
      ↓
req.user.userId
      ↓
Profile Controller
      ↓
Profile Service
      ↓
Profile Repository
      ↓
PostgreSQL
```

---

# 🔄 Updated Profile Architecture

The desired flow is:

```text
Client
  ↓
GET /profile
  ↓
Authorization: Bearer <JWT>
  ↓
authMiddleware
  ↓
jwt.verify()
  ↓
req.user = { userId: 5 }
  ↓
next()
  ↓
profileController
  ↓
req.user.userId
  ↓
profileService
  ↓
profileRepository
  ↓
PostgreSQL
  ↓
Profile Response
```

---

# GET vs POST for Profile

The current `/profile` endpoint is using:

```text
POST /profile
```

We will change this to:

```text
GET /profile
```

because the operation is retrieving profile information.

### Concept

```text
GET
 ↓
Retrieve data
```

Therefore:

```http
GET /profile
```

is more appropriate for retrieving the authenticated user's profile.

---

# 🧠 Why `req.user` Instead of `req.body`?

Consider a malicious client sending:

```json
{
  "userId": 100
}
```

If the backend trusts:

```text
req.body.userId
```

the client could potentially request another user's data.

Instead, the backend should use the identity established by authentication:

```text
JWT
 ↓
Verified
 ↓
req.user.userId
```

Therefore:

> [!important]  
> **The authenticated user's identity should come from the verified JWT, not from arbitrary client-provided request data.**

---

# 🏆 Today's Progress

Yesterday we had:

```text
Login
  ↓
JWT Generation
```

Today we went all the way to:

```text
Login
  ↓
JWT
  ↓
Authorization Header
  ↓
Authentication Middleware
  ↓
Bearer Token Extraction
  ↓
JWT Verification
  ↓
req.user
  ↓
Protected API
```

---

# 🔥 Complete Authentication Flow So Far

```text
                         CLIENT
                            │
                            ▼
                       LOGIN REQUEST
                            │
                            ▼
                       CONTROLLER
                            │
                            ▼
                         SERVICE
                            │
                            ▼
                    Find User by Email
                            │
                            ▼
                    bcrypt.compare()
                            │
                     ┌──────┴──────┐
                     │             │
                   false          true
                     │             │
                     ▼             ▼
                  401 Error     jwt.sign()
                                   │
                                   ▼
                                  JWT
                                   │
                                   ▼
                                CLIENT
                                   │
                                   │
                 Authorization: Bearer <JWT>
                                   │
                                   ▼
                       PROTECTED REQUEST
                                   │
                                   ▼
                       Authentication
                          Middleware
                                   │
                                   ▼
                             Extract Token
                                   │
                                   ▼
                            jwt.verify()
                                   │
                         ┌─────────┴─────────┐
                         │                   │
                       Invalid              Valid
                         │                   │
                         ▼                   ▼
                  401 Unauthorized        req.user
                                             │
                                             ▼
                                           next()
                                             │
                                             ▼
                                         Controller
                                             │
                                             ▼
                                          Service
                                             │
                                             ▼
                                        Repository
                                             │
                                             ▼
                                         PostgreSQL
                                             │
                                             ▼
                                         Response
```

---

# 🧩 Authentication Components

At this point, the authentication system contains these major components:

```text
src/
│
├── controllers/
│   ├── auth.controller.ts
│   └── profile.controller.ts
│
├── services/
│   ├── auth.service.ts
│   └── profile.service.ts
│
├── repositories/
│   ├── auth.repository.ts
│   └── profile.repository.ts
│
├── middlewares/
│   ├── error.middleware.ts
│   └── auth.middleware.ts
│
└── types/
    └── express.d.ts
```

> [!note]  
> The exact folder/file structure may differ depending on the current project implementation. The important architectural concepts are the separation between middleware, controllers, services, repositories, and TypeScript type declarations.

---

# 📊 Authentication Progress

```text
┌────────────────────────────────────────────┐
│        BACKEND AUTHENTICATION SERVICE      │
├────────────────────────────────────────────┤
│                                            │
│ Registration                         ✅    │
│ Password Hashing                     ✅    │
│ Global Error Handling                ✅    │
│ Login Validation                     ✅    │
│ bcrypt.compare()                     ✅    │
│ JWT Secret Configuration              ✅    │
│ JWT Expiration                       ✅    │
│ JWT Generation                       ✅    │
│ JWT API Response                     ✅    │
│ Authorization Header                 ✅    │
│ Bearer Token Extraction              ✅    │
│ JWT Authentication Middleware        ✅    │
│ JWT Verification                     ✅    │
│ 401 Unauthorized Handling            ✅    │
│ Express Request Type Extension       ✅    │
│ req.user                             ✅    │
│ Protected Route                      ✅    │
│ Valid JWT → API Access               ✅    │
│ Invalid JWT → 401                    ✅    │
│                                            │
│ Profile using req.user                🚧   │
│ GET /profile                         🚧   │
│ Protected Profile Service            ⏳    │
│                                            │
└────────────────────────────────────────────┘
```

---

# 🧠 Key Takeaways

|Concept|What We Learned|
|---|---|
|`Authorization` Header|Used to send the JWT with API requests|
|`Bearer` Token|Standard format for sending the access token|
|`split(" ")`|Used to separate `Bearer` from the JWT|
|`jwt.verify()`|Validates the JWT using the server secret|
|JWT Verification|Handled cryptographically by `jsonwebtoken`|
|`express.d.ts`|Adds TypeScript knowledge about custom Express properties|
|Declaration Merging|Extends Express's existing `Request` type|
|`req.user`|Contains the authenticated user's information|
|Authentication Middleware|Verifies JWT before allowing access|
|`next()`|Allows a valid authenticated request to continue|
|`401 Unauthorized`|Returned when authentication fails|
|Protected Route|API route that requires valid authentication|
|Trusted Identity|Should come from the verified JWT|
|`req.body`|Client-controlled input; should not determine authenticated identity|
|`GET /profile`|Appropriate method for retrieving profile information|

---

# 🎯 Important Security Principle

> [!important]  
> **Never trust the client to tell you who they are.**
> 
> The client can send a `userId` in the request body, query parameters, or headers, but the backend should establish the authenticated identity by verifying the JWT and using the resulting `req.user`.

Correct:

```text
JWT
 ↓
jwt.verify()
 ↓
req.user.userId
 ↓
Profile
```

Not:

```text
Client
 ↓
req.body.userId
 ↓
Profile
```

---

# 📝 Session Summary

> [!success]  
> **11 August 2026 — Completed**
> 
> - JWT Authentication Middleware
>     
> - Authorization Header
>     
> - Bearer Token Extraction
>     
> - `jwt.verify()`
>     
> - Invalid/expired JWT handling
>     
> - `401 Unauthorized`
>     
> - Express Request Type Extension
>     
> - TypeScript Declaration Merging
>     
> - `req.user`
>     
> - Protected API Route
>     
> - Valid JWT → API access
>     
> - Invalid JWT → 401 Unauthorized
>     

---

# 🚀 Next Session

## Profile Authentication Integration

Continue from:

```text
GET /profile
      ↓
Authorization: Bearer <JWT>
      ↓
authMiddleware
      ↓
jwt.verify()
      ↓
req.user
      ↓
profileController
      ↓
req.user.userId
      ↓
profileService
      ↓
profileRepository
      ↓
PostgreSQL
      ↓
Profile Response
```

### Next Tasks

```text
1. Change /profile from POST → GET
        ↓
2. Stop using req.body for authenticated identity
        ↓
3. Use req.user.userId
        ↓
4. Pass userId to profile service
        ↓
5. Fetch user from PostgreSQL
        ↓
6. Return authenticated user's profile
        ↓
7. Test with valid JWT
        ↓
8. Test with invalid JWT
```

---

# 🫡 Session Milestone

> [!success]  
> **You now have a real working JWT authentication flow.**
> 
> The backend can:
> 
> ```text
> Login
>   ↓
> Generate JWT
>   ↓
> Receive JWT from Client
>   ↓
> Extract Bearer Token
>   ↓
> Verify JWT
>   ↓
> Identify User
>   ↓
> Protect API Routes
> ```
> 
> **Next milestone: Use the authenticated `req.user` to securely retrieve the user's profile. 🔥**


---

# Backend Authentication Service — 12 August 2026

> [!summary]  
> **Session Focus:** RBAC / Authorization

---

# 🫡 End of Today's Session — 12 August 2026

Today we moved from **Authentication → Authorization**, which is a major backend milestone.

The authentication system can now identify users, and the authorization system can determine what those authenticated users are allowed to do.

---

# ✅ What We Completed

## Authentication

```text
Authentication
├── JWT generation                    ✅
├── JWT expiration                    ✅
├── JWT verification                  ✅
├── Bearer token extraction           ✅
└── req.user                          ✅
```

## Authorization / RBAC

```text
Authorization / RBAC
├── User roles                        ✅
├── USER / ADMIN roles                ✅
├── Role in JWT                       ✅
├── Authorization middleware          ✅
├── ADMIN-only route                  ✅
└── DELETE user API                   🔄 Almost complete
```

---

# 🔐 Authentication vs Authorization

## Authentication

> **"Who are you?"**

Authentication verifies the identity of the user.

The current flow is:

```text
JWT
 ↓
verify
 ↓
userId + role
 ↓
req.user
```

More specifically:

```text
Client
  ↓
Authorization: Bearer <JWT>
  ↓
Authentication Middleware
  ↓
jwt.verify()
  ↓
Decoded JWT Payload
  ↓
req.user
```

Example:

```text
req.user
   ↓
{
    userId: 5,
    role: "ADMIN"
}
```

---

# 🛡️ Authorization

> **"Are you allowed to perform this operation?"**

Authorization happens **after authentication**.

The middleware checks the authenticated user's role:

```text
req.user.role
      ↓
authorize("ADMIN")
      ↓
 ┌────┴────┐
 ▼         ▼
Allowed   Denied
  │         │
  ▼         ▼
next()     403
```

### Example

If the authenticated user is:

```text
role: ADMIN
```

and the route requires:

```text
ADMIN
```

then:

```text
ADMIN
  ↓
authorize("ADMIN")
  ↓
Allowed
  ↓
next()
```

But if the user is:

```text
role: USER
```

then:

```text
USER
  ↓
authorize("ADMIN")
  ↓
Permission denied
  ↓
403 Forbidden
```

---

# 🚨 401 vs 403

One of the important distinctions learned today is the difference between:

```text
401 Unauthorized
```

and:

```text
403 Forbidden
```

---

## 401 Unauthorized

> **Authentication failed.**

The server could not establish that the request is from a valid authenticated user.

Examples:

```text
Missing JWT
Invalid JWT
Expired JWT
Malformed JWT
```

Flow:

```text
Request
  ↓
Authentication Middleware
  ↓
JWT invalid/missing
  ↓
401 Unauthorized
```

---

## 403 Forbidden

> **Authentication succeeded, but permission is insufficient.**

The server knows who the user is, but that user is not allowed to perform the requested operation.

Example:

```text
Authenticated User
       ↓
role = USER
       ↓
ADMIN-only route
       ↓
403 Forbidden
```

### Mental Model

```text
401
 ↓
"Who are you?"
 ↓
Authentication failed
```

```text
403
 ↓
"I know who you are,
but you aren't allowed to do this."
 ↓
Authorization failed
```

---

# 🏗️ RBAC

RBAC stands for:

> **Role-Based Access Control**

Instead of giving permissions individually to every user, users are assigned roles.

For this project, we currently have:

```text
USER
ADMIN
```

Conceptually:

```text
User
 ↓
Role
 ↓
Permissions
```

Example:

```text
USER
├── View profile
└── Update own profile

ADMIN
├── View profile
├── Update profile
├── Delete users
└── Perform admin operations
```

The exact permissions will depend on the routes we define.

---

# 👤 User Roles

We introduced roles into the authentication system.

Current roles:

```text
USER
ADMIN
```

The role is included in the JWT payload.

Conceptually:

```text
JWT Payload
│
├── userId
└── role
```

Example:

```json
{
  "userId": 5,
  "role": "ADMIN"
}
```

---

# 🎫 Role in JWT

The authentication flow now carries both the user's identity and role.

Previously:

```text
JWT
 ↓
userId
 ↓
req.user
```

Now:

```text
JWT
 ↓
userId + role
 ↓
req.user
```

Example:

```text
JWT Payload
      ↓
{
    userId: 5,
    role: "ADMIN"
}
      ↓
Authentication Middleware
      ↓
req.user
```

Conceptually:

```text
req.user
├── userId
└── role
```

---

# 🔑 Authentication + Authorization Flow

The complete flow is now:

```text
Client
  ↓
Authorization: Bearer <JWT>
  ↓
Authentication Middleware
  ↓
jwt.verify()
  ↓
req.user = {
    userId,
    role
}
  ↓
Authorization Middleware
  ↓
authorize("ADMIN")
  ↓
Is role ADMIN?
 ├── YES → next()
 └── NO  → 403 Forbidden
```

---

# 🧩 Authorization Middleware

The authorization middleware is responsible for checking whether the authenticated user has the required role.

Conceptually:

```text
authorize("ADMIN")
        ↓
Read req.user.role
        ↓
Compare with required role
        ↓
 ┌──────┴──────┐
 ▼             ▼
Match        No Match
 │              │
 ▼              ▼
next()       403 Forbidden
```

### Important

The authorization middleware depends on authentication middleware.

Why?

Because:

```text
req.user
```

must already exist before we can check:

```text
req.user.role
```

Therefore, the order matters.

---

# 🔗 Middleware Order

Correct:

```text
authMiddleware
      ↓
authorize("ADMIN")
      ↓
Controller
```

Not:

```text
authorize("ADMIN")
      ↓
authMiddleware
```

Because authorization needs the authenticated user's information.

---

# 🏗️ Architecture We Built

The overall backend architecture is now:

```text
Client
  ↓
Route
  ↓
Authentication Middleware
  ↓
Authorization Middleware
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
PostgreSQL
```

Each layer has a specific responsibility.

---

# 🔐 Authentication Middleware

Responsible for:

```text
JWT
 ↓
Verify token
 ↓
Identify user
 ↓
Set req.user
```

---

# 🛡️ Authorization Middleware

Responsible for:

```text
req.user.role
      ↓
Check required role
      ↓
Allow / Deny
```

---

# 🎮 Controller

Responsible for:

```text
Request
  ↓
Call Service
  ↓
Return Response
```

The controller should not contain database logic.

---

# ⚙️ Service

Responsible for:

```text
Business Logic
```

For example:

```text
Delete User
    ↓
Validate business rules
    ↓
Call Repository
```

---

# 🗄️ Repository

Responsible for database operations.

```text
Service
  ↓
Repository
  ↓
PostgreSQL
```

---

# 🗑️ Today's Delete User Operation

Today's main authorization use case was an **ADMIN-only Delete User API**.

The intended flow is:

```text
DELETE /users/:id
       ↓
authMiddleware
       ↓
authorize("ADMIN")
       ↓
deleteUser controller
       ↓
ServiceDelete()
       ↓
userDeletion()
       ↓
PostgreSQL
```

---

# 🔐 Why Delete User Requires ADMIN

Deleting a user is a privileged operation.

Therefore:

```text
DELETE /users/:id
        ↓
Authentication
        ↓
Authorization
        ↓
ADMIN?
   /       \
 YES       NO
  ↓         ↓
Delete     403
```

A normal `USER` should not be allowed to delete another user.

---

# 🧪 Delete User Request

The intended API request is:

```http
DELETE /users/:id
```

For example:

```http
DELETE /users/2
```

The `2` represents the user's ID.

---

# 🚧 Where We Stopped

The last issue we encountered was a **route parameter mismatch**.

Your route was:

```text
/delete/users
```

but the API call was:

```text
/delete/users/2
```

The problem is that the route did not define the `:id` parameter.

---

# 🔍 Route Parameter

If the controller uses:

```text
req.params.id
```

then the route needs:

```text
:id
```

Therefore:

```text
/delete/users/:id
```

matches:

```text
/delete/users/2
```

---

# ❌ Current Problem

Current route:

```text
/delete/users
```

Request:

```text
/delete/users/2
```

These do not match as intended.

Conceptually:

```text
Route:
DELETE /delete/users

Request:
DELETE /delete/users/2
                    ↑
               Extra parameter
```

---

# ✅ Correct Route

The route should include the parameter:

```text
/delete/users/:id
```

Then:

```text
DELETE /delete/users/2
```

matches:

```text
/delete/users/:id
                  ↑
                  2
```

And Express makes it available through:

```text
req.params.id
```

---

# 🔄 Correct Delete Flow

After fixing the route:

```text
Client
  ↓
DELETE /delete/users/2
  ↓
authMiddleware
  ↓
JWT Verification
  ↓
req.user
  ↓
authorize("ADMIN")
  ↓
Check role
  ↓
ADMIN?
  ├── NO → 403 Forbidden
  │
  └── YES
        ↓
   deleteUser Controller
        ↓
   req.params.id
        ↓
   Delete User Service
        ↓
   User Deletion Repository
        ↓
   PostgreSQL
        ↓
   Response
```

---

# 🧠 Important API Design Concept

There are two different pieces of information involved in this request:

### Authenticated User

Who is making the request?

```text
req.user.userId
req.user.role
```

This comes from the verified JWT.

### Target User

Which user should be deleted?

```text
req.params.id
```

This comes from the URL.

Therefore:

```text
DELETE /users/2
```

can conceptually mean:

```text
Authenticated User
        ↓
req.user
        ↓
ADMIN
        ↓
wants to delete
        ↓
Target User
        ↓
req.params.id = 2
```

This distinction is extremely important.

---

# 🔐 Complete Authentication + Authorization Architecture

```text
                              CLIENT
                                 │
                                 ▼
                    Authorization: Bearer <JWT>
                                 │
                                 ▼
                         ROUTE / API
                                 │
                                 ▼
                    Authentication Middleware
                                 │
                                 ▼
                          jwt.verify()
                                 │
                         ┌───────┴───────┐
                         │               │
                      Invalid          Valid
                         │               │
                         ▼               ▼
                    401 Error         req.user
                                         │
                                  ┌──────┴──────┐
                                  │             │
                               userId          role
                                                │
                                                ▼
                                  Authorization Middleware
                                                │
                                       authorize("ADMIN")
                                                │
                                      ┌─────────┴─────────┐
                                      │                   │
                                    ADMIN              USER
                                      │                   │
                                      ▼                   ▼
                                   next()                403
                                      │
                                      ▼
                                  Controller
                                      │
                                      ▼
                                   Service
                                      │
                                      ▼
                                  Repository
                                      │
                                      ▼
                                  PostgreSQL
```

---

# 📊 Authentication vs Authorization

|Feature|Authentication|Authorization|
|---|---|---|
|Main Question|Who are you?|What can you do?|
|Uses JWT|✅|Uses authenticated JWT data|
|Middleware|`authMiddleware`|`authorize()`|
|Main Data|`userId`|`role` / permissions|
|Failure|`401 Unauthorized`|`403 Forbidden`|
|Example|Invalid JWT|USER accessing ADMIN route|
|Result|`req.user` established|Request allowed/denied|

---

# 🧠 Key Takeaways

|Concept|Purpose|
|---|---|
|Authentication|Verifies the user's identity|
|Authorization|Determines whether the user has permission|
|RBAC|Role-Based Access Control|
|`USER`|Normal application role|
|`ADMIN`|Privileged application role|
|Role in JWT|Carries the user's role after authentication|
|`req.user`|Stores authenticated user information|
|`authMiddleware`|Verifies JWT and establishes identity|
|`authorize("ADMIN")`|Checks whether the user has ADMIN role|
|`401 Unauthorized`|Authentication failed|
|`403 Forbidden`|Authentication succeeded but permission is insufficient|
|`req.params.id`|Identifies the target resource from the URL|
|`/users/:id`|Route pattern for resource-specific operations|

---

# 🏆 Today's Progress

Yesterday:

```text
Login
  ↓
JWT
  ↓
Authentication Middleware
  ↓
JWT Verification
  ↓
req.user
  ↓
Protected API
```

Today:

```text
Authentication
      ↓
Authenticated User
      ↓
Role
      ↓
Authorization Middleware
      ↓
ADMIN-only Route
      ↓
Delete User API
```

The authentication system has now evolved into:

```text
Authentication
      +
Authorization
      ↓
Protected Backend
```

---

# 🔥 Development Milestone

You are now building an actual authentication-management backend with:

```text
Registration
     ↓
Password Hashing
     ↓
Login
     ↓
bcrypt.compare()
     ↓
JWT Generation
     ↓
JWT Authentication
     ↓
Protected Routes
     ↓
User Roles
     ↓
RBAC
     ↓
ADMIN-only Operations
```

This is a significant backend engineering milestone.

---

# 🧪 Debugging & Learning Process

Several mistakes happened during today's implementation.

However, most of them were:

```text
TypeScript mistakes
        +
API / route design mistakes
```

rather than misunderstandings of the overall architecture.

The important learning cycle was:

```text
Understand
   ↓
Implement Yourself
   ↓
Get an Error
   ↓
Debug
   ↓
Understand Why
   ↓
Fix It
   ↓
Continue
```

This is an important part of learning backend engineering.

---

# 🎯 Current Project Status

```text
┌─────────────────────────────────────────────┐
│       BACKEND AUTHENTICATION SERVICE        │
├─────────────────────────────────────────────┤
│                                             │
│ Registration                          ✅    │
│ Password Hashing                      ✅    │
│ Global Error Handling                 ✅    │
│ Login Validation                      ✅    │
│ bcrypt.compare()                      ✅    │
│ JWT Secret Configuration              ✅    │
│ JWT Expiration                        ✅    │
│ JWT Generation                        ✅    │
│ JWT Verification                      ✅    │
│ Bearer Token Extraction               ✅    │
│ Authentication Middleware             ✅    │
│ req.user                              ✅    │
│ Protected Routes                      ✅    │
│ User Roles                            ✅    │
│ USER / ADMIN Roles                    ✅    │
│ Role in JWT                           ✅    │
│ Authorization Middleware              ✅    │
│ ADMIN-only Route                      ✅    │
│                                             │
│ DELETE User API                       🔄    │
│ Route Parameter Fix                   🚧    │
│ DELETE /users/:id                     ⏳    │
│                                             │
└─────────────────────────────────────────────┘
```

---

# 🚀 Next Session

## Complete DELETE `/users/:id`

Continue exactly from the route parameter issue.

### Current

```text
/delete/users
```

### Required

```text
/delete/users/:id
```

### Request

```http
DELETE /delete/users/2
```

### Controller

Use:

```text
req.params.id
```

### Final Flow

```text
DELETE /delete/users/2
        ↓
authMiddleware
        ↓
authorize("ADMIN")
        ↓
deleteUser Controller
        ↓
req.params.id
        ↓
Delete User Service
        ↓
User Deletion Repository
        ↓
PostgreSQL
        ↓
Success Response
```

---

# 🫡 End-of-Session Summary

> [!success]  
> **12 August 2026 — RBAC / Authorization Completed**
> 
> Today we moved from:
> 
> **Authentication → Authorization**
> 
> We completed:
> 
> - User roles
>     
> - `USER` / `ADMIN`
>     
> - Role in JWT
>     
> - Authorization middleware
>     
> - ADMIN-only routes
>     
> - `401` vs `403`
>     
> - Protected admin operations
>     
> 
> The only remaining issue is completing the **DELETE `/users/:id` endpoint** by fixing the route parameter.

> [!tip]  
> **Next session:** Fix `/delete/users/:id` → complete Delete User API → test ADMIN authorization end-to-end.

---

# Backend Authentication Service — 14 August 2026

> [!summary]  
> **Session Focus:** Access Tokens + Refresh Tokens

---

# 🫡 End of Today's Session

## 📅 14 August 2026 — Refresh Tokens

Today we started the next major part of authentication:

> **Access Tokens + Refresh Tokens**

This builds on the JWT authentication system we completed in the previous sessions.

---

# ✅ What We Already Had

Before introducing refresh tokens, the authentication flow was:

```text
Login
  ↓
Access Token
  ↓
15-minute expiry
  ↓
Protected APIs
```

The access token is used to authenticate requests to protected APIs.

---

# ⚠️ The Access Token Expiration Problem

Access tokens should have a relatively short lifetime.

For example:

```text
Access Token
      ↓
15-minute expiry
      ↓
Token expires
```

The problem is:

```text
Access Token expires
        ↓
User shouldn't have to login again
        ↓
Need a way to obtain a new Access Token
```

This is where the **Refresh Token** comes in.

---

# 🔄 Access Token + Refresh Token Flow

The basic idea is:

```text
Login
  ↓
Access Token + Refresh Token
  ↓
Use Access Token
  ↓
Access Token expires
  ↓
Client sends Refresh Token
  ↓
Server verifies Refresh Token
  ↓
Generate New Access Token
  ↓
Client continues using API
```

The user does not need to enter their username/password again every time the access token expires.

---

# 🧠 Important Correction

Initially, we thought:

```text
Access Token expires
        ↓
Database trigger automatically creates Refresh Token
```

This is **not how JWT expiration works**.

We corrected the architecture to:

```text
Access Token expires
        ↓
Client calls POST /auth/refresh
        ↓
Client sends Refresh Token
        ↓
Server verifies Refresh Token
        ↓
Generate New Access Token
        ↓
Return New Access Token
```

---

# 🚫 No Database Trigger Is Required

JWT expiration does **not** require a PostgreSQL/database trigger.

The expiration is part of the JWT itself.

Conceptually:

```text
JWT
 ↓
exp claim
 ↓
Expiration time
 ↓
jwt.verify()
 ↓
Expired?
 ├── YES → verification fails
 └── NO  → token is valid
```

When the access token expires, nothing needs to automatically happen inside PostgreSQL.

Instead, the client initiates the refresh process by calling:

```http
POST /auth/refresh
```

with the refresh token.

---

# 🔐 Token Responsibilities

We established that the two tokens have different responsibilities.

---

## Access Token

### Purpose

```text
Access Token
      ↓
Access Protected APIs
```

### Characteristics

```text
Purpose  → Access protected APIs
Lifetime → Short
Example  → 15 minutes
```

The access token is sent with protected API requests:

```http
Authorization: Bearer <ACCESS_TOKEN>
```

Example flow:

```text
Client
  ↓
Authorization: Bearer <Access Token>
  ↓
Authentication Middleware
  ↓
jwt.verify()
  ↓
Protected API
```

---

# 🔄 Refresh Token

### Purpose

```text
Refresh Token
      ↓
Obtain a New Access Token
```

### Characteristics

```text
Purpose  → Obtain a new Access Token
Lifetime → Longer
Example  → Several days
```

The refresh token is **not primarily used to access normal protected APIs**.

Instead, it is used specifically to request a new access token.

---

# 🆚 Access Token vs Refresh Token

|Feature|Access Token|Refresh Token|
|---|---|---|
|Main Purpose|Access protected APIs|Obtain a new access token|
|Lifetime|Short|Long|
|Example|15 minutes|Several days|
|Used with protected APIs|✅ Yes|❌ No|
|Used with `/auth/refresh`|❌ No|✅ Yes|
|Sent as Bearer token to every API|✅|❌|
|Contains user identity|Yes|Minimal identity information|
|Used for continuous sessions|Indirectly|Yes|

---

# 🧩 Refresh Token Payload

We established that the refresh token should contain **minimal information**.

Primarily:

```text
Refresh Token
      ↓
User Identity
```

For example:

```json
{
  "userId": 5
}
```

The idea is to avoid putting unnecessary information into the refresh token.

---

# ⚠️ Why Keep the Refresh Token Payload Minimal?

A refresh token's main responsibility is:

> Identify which user is requesting a new access token.

Therefore, we don't need to put lots of information inside it.

Conceptually:

```text
Refresh Token Payload
│
└── userId
```

rather than:

```text
Refresh Token Payload
│
├── userId
├── role
├── password
├── profile data
├── unnecessary claims
└── sensitive information
```

The refresh token should contain only what is necessary for the refresh process.

---

# 🔑 Separate Token Responsibilities

The overall architecture is:

```text
                    Authentication
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
        Access Token             Refresh Token
              │                       │
              ▼                       ▼
      Protected APIs          /auth/refresh
              │                       │
              ▼                       ▼
       Short lifetime          Longer lifetime
```

---

# 🔄 Complete Refresh Flow

The intended refresh flow is:

```text
                         CLIENT
                            │
                            │ Access Token
                            ▼
                     Protected API
                            │
                            ▼
                     Access Token
                        expires
                            │
                            ▼
                  POST /auth/refresh
                            │
                            │ Refresh Token
                            ▼
                     Refresh Endpoint
                            │
                            ▼
                Verify Refresh Token
                            │
                       ┌────┴────┐
                       │         │
                     Valid     Invalid
                       │         │
                       ▼         ▼
                Generate New    401
                Access Token
                       │
                       ▼
                     Client
                       │
                       ▼
                Continue API usage
```

---

# 🏗️ Current Authentication Architecture

The project has now evolved from simple login authentication into a token-based session architecture.

```text
Client
  │
  ▼
Login
  │
  ▼
Authentication
  │
  ├───────────────┐
  ▼               ▼
Access Token   Refresh Token
  │               │
  │               │
  ▼               ▼
Protected       /auth/refresh
APIs                │
  │                 ▼
  │           Verify Refresh Token
  │                 │
  │                 ▼
  │          New Access Token
  │                 │
  └────────◄────────┘
```

---

# 🧠 Important Mental Model

Think of the tokens this way:

```text
Access Token
    ↓
"Let me access this protected resource."
```

while:

```text
Refresh Token
    ↓
"Let me prove that I can obtain a new access token."
```

They serve different purposes.

---

# ⏳ Token Lifetimes

A typical architecture might look like:

```text
Access Token
     ↓
15 minutes
```

while:

```text
Refresh Token
     ↓
Several days
```

The exact durations are configuration decisions and can be changed later.

The important principle is:

> **Access token = short-lived**
> 
> **Refresh token = longer-lived**

---

# 🔐 Security Concept

The access token is intentionally short-lived.

If an access token is compromised:

```text
Attacker obtains Access Token
          ↓
Token has limited lifetime
          ↓
Eventually expires
```

The refresh token allows the legitimate client to obtain another access token without requiring the user to log in again.

Therefore, refresh tokens require stronger protection because they have a longer lifetime.

---

# 📍 Where We Will Continue

The refresh-token implementation will be built step by step.

## Next Tasks

```text
1. Decide refresh-token payload
        ↓
2. Add refresh-token secret/config
        ↓
3. Generate refresh token during login
        ↓
4. Return access + refresh tokens
        ↓
5. Create POST /auth/refresh
        ↓
6. Verify refresh token
        ↓
7. Generate new access token
        ↓
8. Test the complete flow
        ↓
9. Later → rotation + logout/revocation
```

---

# 1️⃣ Decide Refresh-Token Payload

We need to finalize what information the refresh token contains.

Current direction:

```json
{
  "userId": 5
}
```

The goal is to keep the refresh token payload minimal.

---

# 2️⃣ Add Refresh-Token Secret/Config

The refresh token should have its own signing configuration.

Conceptually:

```text
Access Token
      ↓
ACCESS_TOKEN_SECRET

Refresh Token
      ↓
REFRESH_TOKEN_SECRET
```

This separates the secrets used for the two token types.

The secrets should remain server-side and should be configured securely through environment variables.

---

# 3️⃣ Generate Refresh Token During Login

Currently:

```text
Login
  ↓
Verify Password
  ↓
Generate Access Token
```

We will change this to:

```text
Login
  ↓
Verify Password
  ↓
Generate Access Token
  ↓
Generate Refresh Token
```

---

# 4️⃣ Return Both Tokens

The login response will eventually contain both tokens.

Conceptually:

```json
{
  "message": "User Successfully logged in",
  "data": {
    "accessToken": "<ACCESS_TOKEN>",
    "refreshToken": "<REFRESH_TOKEN>"
  }
}
```

The exact response structure can depend on the implementation.

---

# 5️⃣ Create `/auth/refresh`

We will create:

```http
POST /auth/refresh
```

Its responsibility will be to receive the refresh token and use it to generate a new access token.

Conceptually:

```text
POST /auth/refresh
        ↓
Receive Refresh Token
        ↓
Verify Refresh Token
        ↓
Extract userId
        ↓
Generate New Access Token
        ↓
Return New Access Token
```

---

# 6️⃣ Verify Refresh Token

The server will verify the refresh token before issuing a new access token.

Conceptually:

```text
Refresh Token
      +
Refresh Token Secret
      ↓
Verify
      ↓
 ┌────┴────┐
 ▼         ▼
Valid     Invalid
 │         │
 ▼         ▼
Continue   401
```

---

# 7️⃣ Generate New Access Token

After successful refresh-token verification:

```text
Verified Refresh Token
        ↓
Extract userId
        ↓
Generate New Access Token
        ↓
Return Access Token
```

The user does not need to provide their password again.

---

# 8️⃣ Test Complete Flow

We will test:

### Initial Login

```text
Login
 ↓
Access Token
 +
Refresh Token
```

### Access Protected API

```text
Access Token
 ↓
Authorization: Bearer <Access Token>
 ↓
Protected API
 ↓
Success
```

### Access Token Expiration

```text
Access Token
 ↓
Expires
```

### Refresh

```text
POST /auth/refresh
 ↓
Refresh Token
 ↓
Verify
 ↓
New Access Token
```

### Continue Using API

```text
New Access Token
 ↓
Authorization: Bearer <New Access Token>
 ↓
Protected API
 ↓
Success
```

---

# 9️⃣ Future — Token Rotation + Logout / Revocation

After the basic refresh-token flow is working, we will eventually cover:

```text
Refresh Token Rotation
        ↓
Logout
        ↓
Token Revocation
```

These are more advanced session-security concepts.

They are **not part of today's implementation yet**.

---

# 📊 Current Project Progress

```text
┌─────────────────────────────────────────────┐
│       BACKEND AUTHENTICATION SERVICE        │
├─────────────────────────────────────────────┤
│                                             │
│ Registration                          ✅    │
│ Password Hashing                      ✅    │
│ Login                                 ✅    │
│ JWT Access Token                      ✅    │
│ JWT Expiration                        ✅    │
│ Authentication Middleware             ✅    │
│ Protected APIs                        ✅    │
│ RBAC                                  ✅    │
│ Admin-only DELETE                     ✅    │
│                                             │
│ Refresh Token                         🟡    │
│                                             │
└─────────────────────────────────────────────┘
```

---

# 🏆 Authentication Milestone

The project has progressed through several major stages:

```text
Registration
      ↓
Password Hashing
      ↓
Login
      ↓
JWT Access Token
      ↓
JWT Authentication
      ↓
Protected APIs
      ↓
RBAC / Authorization
      ↓
Admin Operations
      ↓
Refresh Tokens
```

---

# 🔥 Current Authentication Architecture

```text
                              CLIENT
                                 │
                                 ▼
                               LOGIN
                                 │
                                 ▼
                          Verify Password
                                 │
                                 ▼
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
              Access Token             Refresh Token
                    │                         │
             Short Lifetime             Long Lifetime
                    │                         │
                    ▼                         ▼
             Protected APIs             /auth/refresh
                                              │
                                              ▼
                                      Verify Refresh Token
                                              │
                                              ▼
                                      Generate New Access
                                            Token
                                              │
                                              ▼
                                            CLIENT
                                              │
                                              ▼
                                       Protected APIs
```

---

# 🧠 Key Takeaways

|Concept|Purpose|
|---|---|
|Access Token|Used to access protected APIs|
|Refresh Token|Used to obtain a new access token|
|Access Token Lifetime|Short|
|Refresh Token Lifetime|Longer|
|Access Token Example|15 minutes|
|Refresh Token Example|Several days|
|JWT Expiration|Does not require a database trigger|
|`/auth/refresh`|Endpoint for refreshing access tokens|
|Refresh Token Payload|Should contain minimal information|
|Refresh Token Secret|Server-side secret used to verify refresh tokens|
|Token Rotation|Future security enhancement|
|Revocation|Future mechanism for invalidating refresh tokens|
|Logout|Future session-management feature|

---

# ⚠️ Important Correction to Remember

> [!important]  
> **JWT expiration does not automatically trigger a database operation.**
> 
> When an access token expires, the client must initiate the refresh flow by sending the refresh token to the refresh endpoint.

Correct:

```text
Access Token expires
        ↓
Client
        ↓
POST /auth/refresh
        ↓
Refresh Token
        ↓
Server verifies
        ↓
New Access Token
```

Not:

```text
Access Token expires
        ↓
PostgreSQL Trigger
        ↓
Automatically create Refresh Token
```

---

# 📝 Session Summary

> [!success]  
> **14 August 2026 — Refresh Tokens Started**
> 
> Today we learned:
> 
> - Why access tokens should be short-lived
>     
> - The problem caused by access-token expiration
>     
> - Why users shouldn't need to log in again every time an access token expires
>     
> - The purpose of refresh tokens
>     
> - Access Token vs Refresh Token responsibilities
>     
> - Why JWT expiration does not require a database trigger
>     
> - Why the refresh token should contain minimal information
>     
> - The purpose of `/auth/refresh`
>     
> - The overall refresh-token architecture
>     
> - The future concepts of token rotation, logout, and revocation
>     

---

# 🚀 Next Session

## Build the Refresh-Token Flow

Continue from:

```text
1. Decide refresh-token payload
        ↓
2. Add refresh-token secret/config
        ↓
3. Generate refresh token during login
        ↓
4. Return access + refresh tokens
        ↓
5. Create POST /auth/refresh
        ↓
6. Verify refresh token
        ↓
7. Generate new access token
        ↓
8. Test complete flow
```

> [!tip]  
> **Next major milestone: Build the complete Access Token + Refresh Token flow step by step, with the implementation written by you. 🔥**

---

# 🫡 End-of-Session Milestone

> [!success]  
> **Authentication has now evolved from simple JWT login into a session-renewal architecture.**
> 
> ```text
> Login
>   ↓
> Access Token + Refresh Token
>   ↓
> Access Token → Protected APIs
>   ↓
> Access Token expires
>   ↓
> Refresh Token → /auth/refresh
>   ↓
> New Access Token
>   ↓
> Continue using protected APIs
> ```
> 
> **Next session: implement it. 🫡🔥**