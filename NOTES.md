# Todo CRUD REST API — Beginner's Learning Guide

Build a complete Todo application with Node.js, Express.js, and MySQL. This guide teaches you REST API development step by step.

---

## Table of Contents

1. [Project Introduction](#1-project-introduction)
2. [Prerequisites](#2-prerequisites)
3. [Create the Project](#3-create-the-project)
4. [Install Dependencies](#4-install-dependencies)
5. [Project Structure](#5-project-structure)
6. [Configure Environment Variables](#6-configure-environment-variables)
7. [Create MySQL Database](#7-create-mysql-database)
8. [Connect Node.js to MySQL](#8-connect-nodejs-to-mysql)
9. [Create Express Application](#9-create-express-application)
10. [Health Check Endpoint](#10-health-check-endpoint)
11. [REST API Routes Overview](#11-rest-api-routes-overview)
12. [Create Todo Routes](#12-create-todo-routes)
13. [Create Todo Controller](#13-create-todo-controller)
14. [Implement CREATE Todo](#14-implement-create-todo)
15. [Implement GET All Todos](#15-implement-get-all-todos)
16. [Implement GET Todo by ID](#16-implement-get-todo-by-id)
17. [Implement UPDATE Todo](#17-implement-update-todo)
18. [Implement DELETE Todo](#18-implement-delete-todo)
19. [Error Handling](#19-error-handling)
20. [Input Validation](#20-input-validation)
21. [Test Complete CRUD Using Postman](#21-test-complete-crud-using-postman)
22. [Common Errors and Troubleshooting](#22-common-errors-and-troubleshooting)
23. [npm Scripts](#23-npm-scripts)
24. [Final Project Structure](#24-final-project-structure)
25. [Final API Documentation](#25-final-api-documentation)
26. [Learning Checklist](#26-learning-checklist)
27. [Beginner Exercises](#27-beginner-exercises)

---

## 1. Project Introduction

### What is a Todo Application?

A Todo application lets users create, read, update, and delete tasks. It is one of the most common beginner projects because it covers all basic operations you need in real applications.

### What is CRUD?

CRUD stands for four operations every application needs:

| Operation | Meaning | Example |
|-----------|---------|---------|
| **C**reate | Add new data | Create a new todo |
| **R**ead | View existing data | List all todos |
| **U**pdate | Change existing data | Mark a todo as done |
| **D**elete | Remove data | Delete a todo |

### What is a REST API?

REST API is a way for computers to communicate over HTTP. A client (like Postman or a browser) sends a request to a server, and the server sends back a response.

Example flow:

```
Client (Postman)
     |
     | HTTP Request (POST /api/todos)
     v
Express Server
     |
     | SQL Query
     v
MySQL Database
     |
     | Result
     v
JSON Response back to Client
```

### What is Node.js?

Node.js lets you run JavaScript outside the browser. It is used to build servers, APIs, and command-line tools.

### What is Express.js?

Express is a lightweight framework for Node.js. It makes it easy to create HTTP servers, define routes, and handle requests.

### What is MySQL?

MySQL is a relational database. It stores data in tables with rows and columns, like a spreadsheet. You interact with it using SQL (Structured Query Language).

### How Node.js, Express, and MySQL Work Together

```
Client/Postman
     |
     v
Express API (handles HTTP requests)
     |
     v
MySQL Database (stores the data)
```

1. Client sends a request to Express
2. Express finds the matching route
3. Route calls the controller function
4. Controller runs a SQL query on MySQL
5. MySQL returns results
6. Controller sends JSON response back to client

---

## 2. Prerequisites

Before starting, install these tools on your computer:

### Node.js and npm

Node.js runs JavaScript. npm (Node Package Manager) installs libraries.

Download from: https://nodejs.org

Verify installation:

```bash
node -v
# Output: v18.x.x or higher

npm -v
# Output: 9.x.x or higher
```

### MySQL

MySQL stores your data.

Download from: https://dev.mysql.com/downloads/mysql/

Verify installation:

```bash
mysql --version
# Output: mysql  Ver 8.x.x
```

### MySQL Workbench (Optional)

A visual tool for managing MySQL databases. Download from: https://dev.mysql.com/downloads/workbench/

### Postman

Postman tests your API by sending HTTP requests.

Download from: https://www.postman.com/downloads/

### What Each Command Does

| Command | Purpose |
|---------|---------|
| `node -v` | Shows installed Node.js version |
| `npm -v` | Shows installed npm version |
| `mysql --version` | Shows installed MySQL version |

---

## 3. Create the Project

Open your terminal and run these commands one by one:

### Step 1 — Create a folder

```bash
mkdir todo-api
```

**What does `mkdir` do?** It creates a new directory (folder). `mkdir` stands for "make directory".

### Step 2 — Enter the folder

```bash
cd todo-api
```

**What does `cd` do?** It changes your current directory. `cd` stands for "change directory".

### Step 3 — Initialize the project

```bash
npm init -y
```

**What does `npm init -y` do?** It creates a `package.json` file with default values. The `-y` flag means "yes to all questions".

**What is `package.json`?** It is a file that describes your project. It stores:

- Project name and version
- List of dependencies (libraries you use)
- Scripts (commands you can run)

You will see a file created called `package.json`. Open it — it looks like this:

```json
{
  "name": "todo-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

---

## 4. Install Dependencies

Run these commands in your terminal:

### Production dependencies

```bash
npm install express mysql2 dotenv
```

### Development dependency

```bash
npm install --save-dev nodemon
```

### What Each Package Does

#### express

Express is a web framework. It handles HTTP requests and responses. Instead of writing complex low-level Node.js code, Express gives you simple functions like `app.get()` and `app.post()`.

#### mysql2

mysql2 is a MySQL driver for Node.js. Node.js cannot talk to MySQL directly. mysql2 acts as a bridge — it translates your JavaScript code into SQL queries and sends them to MySQL.

#### dotenv

dotenv loads environment variables from a `.env` file into `process.env`. This keeps sensitive data like database passwords out of your code.

#### nodemon

nodemon automatically restarts your server when you save a file. Without nodemon, you would have to stop and restart the server manually after every change.

After installing, your `package.json` will have a new section called `dependencies`:

```json
{
  "dependencies": {
    "dotenv": "^16.x.x",
    "express": "^4.x.x",
    "mysql2": "^3.x.x"
  },
  "devDependencies": {
    "nodemon": "^3.x.x"
  }
}
```

---

## 5. Project Structure

Create these folders and files:

```text
todo-api/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── todo.controller.js
│   │
│   ├── routes/
│   │   └── todo.routes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
```

### What Each File Does

| File | Responsibility |
|------|----------------|
| `src/config/db.js` | Connects to MySQL database |
| `src/controllers/todo.controller.js` | Contains logic for each CRUD operation |
| `src/routes/todo.routes.js` | Maps HTTP methods and URLs to controller functions |
| `src/app.js` | Creates and configures the Express application |
| `src/server.js` | Starts the server |
| `.env` | Stores secret configuration (database password, port) |
| `.gitignore` | Tells Git which files to ignore |
| `package.json` | Project metadata and dependencies |

### Why This Structure?

- **Separation of concerns**: Each file has one job
- **Easy to find code**: Routes in one place, logic in another
- **Scalable**: Easy to add new features later
- **Beginner-friendly**: Simple enough to understand without over-engineering

Create the folders:

```bash
mkdir -p src/config src/controllers src/routes
```

---

## 6. Configure Environment Variables

### Step 1 — Create `.env` file

Create a file called `.env` in the project root:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=todo_db
DB_PORT=3306
```

**What is `.env`?** It stores configuration values that change between environments. You do not want to hardcode passwords in your source code.

**Why not hardcode passwords?** If someone sees your code (on GitHub for example), they would see your database password. Using `.env` keeps secrets separate from code.

**Replace `your_password_here`** with your actual MySQL root password.

### Step 2 — Create `.gitignore`

Create a file called `.gitignore`:

```text
node_modules/
.env
```

**What is `.gitignore`?** It tells Git which files and folders to not track.

- `node_modules/` — Contains thousands of installed packages. You do not need to save them.
- `.env` — Contains secrets. You do not want to accidentally push them to GitHub.

---

## 7. Create MySQL Database

### Step 1 — Open MySQL

Open MySQL Workbench or MySQL command line and log in with your credentials.

### Step 2 — Create the database

```sql
CREATE DATABASE todo_db;
```

**What does this do?** It creates a new empty database called `todo_db`.

### Step 3 — Select the database

```sql
USE todo_db;
```

**What does this do?** It tells MySQL: "I want to work with this database from now on."

### Step 4 — Create the todos table

```sql
CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### What Each Part Means

| Part | Meaning |
|------|---------|
| `id INT AUTO_INCREMENT PRIMARY KEY` | A number that automatically increases. Each new row gets the next number. It uniquely identifies each row. |
| `title VARCHAR(255) NOT NULL` | A text field up to 255 characters. `NOT NULL` means it cannot be empty. |
| `description TEXT` | A text field for longer text. No length limit. |
| `completed BOOLEAN DEFAULT FALSE` | A true/false value. Defaults to `FALSE` (not completed). |
| `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP` | Automatically stores the date and time when the row is created. |
| `updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP` | Automatically stores the date and time. |

### Step 5 — Verify the table

```sql
DESCRIBE todos;
```

This shows all columns in the table with their types and properties.

### Step 6 — Check for existing data

```sql
SELECT * FROM todos;
```

This returns all rows. Right now it will be empty — that is correct.

---

## 8. Connect Node.js to MySQL

### Goal

Create a database connection that Node.js can use to talk to MySQL.

### Concept

A **database connection** is a link between your Node.js application and MySQL. Every time you need data, you send a SQL query through this connection.

A **connection pool** is a group of ready connections. Instead of opening and closing a connection for every query, the pool reuses existing connections. This is faster and more efficient.

### Files

Create: `src/config/db.js`

### Implementation

```js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = pool;
```

### Explanation

- `require("mysql2/promise")` — Loads mysql2 with Promise support. This lets you use `async/await`.
- `mysql.createPool({...})` — Creates a connection pool with your database settings.
- `process.env.DB_HOST` — Reads the value from your `.env` file. dotenv loads these into `process.env` automatically.
- `module.exports = pool` — Exports the pool so other files can use it.

### Why `mysql2/promise`?

Regular mysql2 uses callbacks. The `/promise` version lets you write:

```js
const [rows] = await pool.query("SELECT * FROM todos");
```

Instead of:

```js
pool.query("SELECT * FROM todos", function(err, rows) { ... });
```

`async/await` is easier to read and write.

---

## 9. Create Express Application

### Goal

Set up an Express server that can receive HTTP requests.

### Concept

**Middleware** is a function that runs before your route handler. It can:

- Parse request bodies
- Add headers
- Log requests
- Handle errors

`express.json()` is middleware that parses JSON request bodies. Without it, `req.body` will be `undefined`.

### Files

Create: `src/app.js`

```js
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Todo API is running" });
});

module.exports = app;
```

Create: `src/server.js`

```js
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### What is the difference between `app.js` and `server.js`?

- `app.js` — Creates and configures the Express application. Does NOT start the server.
- `server.js` — Imports the app and starts listening for requests.

This separation is useful because you can test `app.js` without starting the server.

### Explanation

- `const app = express()` — Creates an Express application.
- `app.use(express.json())` — Adds JSON parsing middleware.
- `app.get("/api/health", ...)` — Defines a GET route.
- `app.listen(PORT, ...)` — Starts the server on the given port.

### Test

Start the server:

```bash
node src/server.js
```

You should see:

```
Server is running on port 3000
```

Open Postman and send a GET request to:

```
http://localhost:3000/api/health
```

Expected response:

```json
{
  "message": "Todo API is running"
}
```

---

## 10. Health Check Endpoint

### Goal

Verify your server is working before building CRUD operations.

### Concept

A health check endpoint is a simple route that confirms the API is running. It is used for monitoring and debugging.

### Implementation

Already added in `src/app.js`:

```js
app.get("/api/health", (req, res) => {
  res.json({ message: "Todo API is running" });
});
```

### Test in Postman

1. Open Postman
2. Create a new request
3. Set method to `GET`
4. Enter URL: `http://localhost:3000/api/health`
5. Click Send

### Expected Result

Status: `200 OK`

Body:

```json
{
  "message": "Todo API is running"
}
```

---

## 11. REST API Routes Overview

Before writing CRUD code, understand how REST API routes work.

### Route Table

| Operation | HTTP Method | Endpoint | Description |
|-----------|-------------|----------|-------------|
| Create | POST | `/api/todos` | Add a new todo |
| Get All | GET | `/api/todos` | List all todos |
| Get One | GET | `/api/todos/:id` | Get a single todo by ID |
| Update | PUT | `/api/todos/:id` | Update a todo |
| Delete | DELETE | `/api/todos/:id` | Delete a todo |

### HTTP Methods

| Method | Purpose | Has body? |
|--------|---------|-----------|
| GET | Retrieve data | No |
| POST | Create data | Yes |
| PUT | Update data | Yes |
| DELETE | Remove data | No |

### URL Parameters

In `/api/todos/:id`, the `:id` is a URL parameter. It captures a value from the URL.

Example: `/api/todos/5` — the `id` parameter is `5`.

In your code, you access it with `req.params.id`.

### Request Body

When you send POST or PUT requests, you send data in the request body as JSON.

Example:

```json
{
  "title": "Learn Node.js",
  "description": "Build an API"
}
```

In your code, you access it with `req.body.title` and `req.body.description`.

### JSON

JSON (JavaScript Object Notation) is the standard format for exchanging data. It looks like JavaScript objects but as text.

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK — Request succeeded |
| 201 | Created — New resource created |
| 400 | Bad Request — Client sent invalid data |
| 404 | Not Found — Resource does not exist |
| 500 | Internal Server Error — Server problem |

---

## 12. Create Todo Routes

### Goal

Define all todo routes in a separate file.

### Concept

Routes map HTTP methods and URLs to handler functions. Separating routes from the main app keeps code organized.

### Files

Create: `src/routes/todo.routes.js`

```js
const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodoById);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
```

### Explanation

- `express.Router()` — Creates a router object. A router groups related routes.
- `router.get("/", ...)` — Handles GET requests to the base path.
- `router.post("/", ...)` — Handles POST requests.
- `router.get("/:id", ...)` — Handles GET requests with an ID parameter.
- `require("../controllers/todo.controller")` — Imports the controller functions.

### Register the Router

Update `src/app.js` to use the todo routes:

```js
const express = require("express");
const dotenv = require("dotenv");
const todoRoutes = require("./routes/todo.routes");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Todo API is running" });
});

app.use("/api/todos", todoRoutes);

module.exports = app;
```

The line `app.use("/api/todos", todoRoutes)` means:

- All routes in `todoRoutes` start with `/api/todos`
- `router.get("/")` becomes `GET /api/todos`
- `router.get("/:id")` becomes `GET /api/todos/:id`

---

## 13. Create Todo Controller

### Goal

Create the controller file with empty function stubs.

### Concept

A **controller** contains the logic for each route. When a request comes in, the route calls the appropriate controller function. The controller:

1. Reads data from the request
2. Runs database queries
3. Sends a response

### Files

Create: `src/controllers/todo.controller.js`

```js
const pool = require("../config/db");

exports.getAllTodos = async (req, res) => {
  // Will implement later
};

exports.getTodoById = async (req, res) => {
  // Will implement later
};

exports.createTodo = async (req, res) => {
  // Will implement later
};

exports.updateTodo = async (req, res) => {
  // Will implement later
};

exports.deleteTodo = async (req, res) => {
  // Will implement later
};
```

### Explanation

- `const pool = require("../config/db")` — Imports the database connection pool.
- `exports.functionName` — Exports functions so the routes can use them.
- `async (req, res) => {}` — Each function receives the request (`req`) and response (`res`) objects.
- `async` — Allows using `await` inside the function for database queries.

---

## 14. Implement CREATE Todo

### Goal

Add a new todo to the database.

### Concept

When a client sends a POST request with JSON data, the server:

1. Receives the request
2. Reads `req.body` to get the data
3. Runs an INSERT SQL query
4. Sends back a response with the new todo's ID

### SQL

```sql
INSERT INTO todos (title, description) VALUES (?, ?);
```

The `?` marks are placeholders. mysql2 replaces them with actual values. This is called a **parameterized query** and prevents SQL injection.

**SQL injection** is when someone sends malicious SQL code through your input. For example, if you concatenated user input directly into SQL:

```js
// NEVER DO THIS
const sql = `INSERT INTO todos (title) VALUES ('${title}')`;
```

Someone could send: `'; DROP TABLE todos; --` and delete your table.

Parameterized queries treat user input as data, not as SQL code. Always use `?` placeholders.

### Files

Edit: `src/controllers/todo.controller.js`

Add the implementation for `createTodo`:

```js
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const [result] = await pool.query(
      "INSERT INTO todos (title, description) VALUES (?, ?)",
      [title, description]
    );

    res.status(201).json({
      message: "Todo created successfully",
      todoId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error: error.message });
  }
};
```

### Explanation

- `const { title, description } = req.body` — Extracts title and description from the request body.
- `pool.query(sql, [values])` — Runs the SQL query with parameterized values.
- `result.insertId` — After inserting, MySQL returns the auto-incremented ID of the new row.
- `res.status(201)` — Sets HTTP status to 201 (Created).
- `res.json({...})` — Sends a JSON response.

### Test in Postman

1. Create a new request
2. Set method to `POST`
3. Enter URL: `http://localhost:3000/api/todos`
4. Go to the **Body** tab
5. Select **raw** and **JSON**
6. Enter:

```json
{
  "title": "Learn Node.js",
  "description": "Learn Express and MySQL"
}
```

7. Click Send

### Expected Result

Status: `201 Created`

Body:

```json
{
  "message": "Todo created successfully",
  "todoId": 1
}
```

### Common Mistakes

| Mistake | Solution |
|---------|----------|
| `req.body` is undefined | Make sure `app.use(express.json())` is in `app.js` |
| Sending form data instead of JSON | In Postman Body, select **raw** and **JSON** |
| Missing Content-Type header | Postman adds it automatically when you select JSON |
| SQL syntax error | Check your SQL query string for typos |

### Checkpoint

Create a second todo with a different title. Check if the `todoId` is `2`.

---

## 15. Implement GET All Todos

### Goal

Retrieve all todos from the database.

### Concept

A SELECT query reads data from a database table. The result is an array of rows.

### SQL

```sql
SELECT * FROM todos ORDER BY id DESC;
```

- `SELECT *` — Select all columns
- `FROM todos` — From the todos table
- `ORDER BY id DESC` — Sort by ID in descending order (newest first)

### Files

Edit: `src/controllers/todo.controller.js`

Add the implementation for `getAllTodos`:

```js
exports.getAllTodos = async (req, res) => {
  try {
    const [todos] = await pool.query("SELECT * FROM todos ORDER BY id DESC");

    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error: error.message });
  }
};
```

### Explanation

- `const [todos] = await pool.query(...)` — Executes the query. mysql2 returns `[rows, fields]`. We only need `rows`, so we destructure with `[todos]`.
- `res.json(todos)` — Sends the array of todos as JSON. Default status is 200.

### Test in Postman

1. Set method to `GET`
2. Enter URL: `http://localhost:3000/api/todos`
3. Click Send

### Expected Result

Status: `200 OK`

Body:

```json
[
  {
    "id": 1,
    "title": "Learn Node.js",
    "description": "Learn Express and MySQL",
    "completed": 0,
    "created_at": "2026-09-13T10:00:00.000Z",
    "updated_at": "2026-09-13T10:00:00.000Z"
  }
]
```

---

## 16. Implement GET Todo by ID

### Goal

Retrieve a single todo by its ID.

### Concept

URL parameters let you pass values in the URL. In `/api/todos/:id`, the `:id` part is captured and available as `req.params.id`.

### SQL

```sql
SELECT * FROM todos WHERE id = ?;
```

- `WHERE id = ?` — Filters rows where the id matches the given value

### Files

Edit: `src/controllers/todo.controller.js`

Add the implementation for `getTodoById`:

```js
exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const [todos] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);

    if (todos.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todos[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo", error: error.message });
  }
};
```

### Explanation

- `const { id } = req.params` — Extracts the `id` from the URL parameters.
- `todos.length === 0` — If no rows match, the todo does not exist.
- `res.status(404)` — Returns 404 (Not Found).
- `todos[0]` — Returns the first (and only) matching row as an object, not an array.

### Test in Postman

1. Set method to `GET`
2. Enter URL: `http://localhost:3000/api/todos/1`
3. Click Send

### Expected Result

Status: `200 OK`

Body:

```json
{
  "id": 1,
  "title": "Learn Node.js",
  "description": "Learn Express and MySQL",
  "completed": 0,
  "created_at": "2026-09-13T10:00:00.000Z",
  "updated_at": "2026-09-13T10:00:00.000Z"
}
```

### Test with non-existent ID

Enter URL: `http://localhost:3000/api/todos/999`

Expected: Status `404 Not Found` with message `"Todo not found"`.

---

## 17. Implement UPDATE Todo

### Goal

Update an existing todo.

### Concept

An UPDATE query changes existing rows. The WHERE clause specifies which rows to update. Without WHERE, ALL rows would be updated.

### SQL

```sql
UPDATE todos
SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;
```

- `SET` — Specifies which columns to change
- `WHERE` — Specifies which row to update
- `CURRENT_TIMESTAMP` — Updates the `updated_at` field to the current time

### Files

Edit: `src/controllers/todo.controller.js`

Add the implementation for `updateTodo`:

```js
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const [result] = await pool.query(
      "UPDATE todos SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [title, description, completed, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error: error.message });
  }
};
```

### Explanation

- `result.affectedRows` — Tells how many rows were changed. If 0, no todo with that ID exists.
- We pass 4 values to the query: `title`, `description`, `completed`, and `id`.

### Test in Postman

1. Set method to `PUT`
2. Enter URL: `http://localhost:3000/api/todos/1`
3. Go to Body, select raw + JSON
4. Enter:

```json
{
  "title": "Learn Node.js and Express",
  "description": "Build a Todo REST API",
  "completed": true
}
```

5. Click Send

### Expected Result

Status: `200 OK`

Body:

```json
{
  "message": "Todo updated successfully"
}
```

### Common Mistakes

| Mistake | Solution |
|---------|----------|
| Forgetting WHERE clause | Always include WHERE in UPDATE queries |
| Updating all rows | Without WHERE, every row gets updated |
| Not checking affectedRows | Check affectedRows to confirm the update happened |

### Checkpoint

What happens if you run an UPDATE without a WHERE clause? It updates EVERY row in the table. Always include WHERE.

---

## 18. Implement DELETE Todo

### Goal

Remove a todo from the database.

### Concept

A DELETE query removes rows from a table. Always use a WHERE clause to specify which rows to delete.

### SQL

```sql
DELETE FROM todos WHERE id = ?;
```

### Files

Edit: `src/controllers/todo.controller.js`

Add the implementation for `deleteTodo`:

```js
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM todos WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error: error.message });
  }
};
```

### Explanation

- Same pattern as update: extract ID, run query, check affectedRows.
- If `affectedRows === 0`, no todo was found with that ID.

### Test in Postman

1. Set method to `DELETE`
2. Enter URL: `http://localhost:3000/api/todos/1`
3. Click Send

### Expected Result

Status: `200 OK`

Body:

```json
{
  "message": "Todo deleted successfully"
}
```

### Verify Deletion

Send a GET request to `/api/todos/1`.

Expected: Status `404 Not Found` with message `"Todo not found"`.

---

## 19. Error Handling

### Goal

Handle errors gracefully so your API does not crash.

### Concept

Errors can happen at any time:

- Database connection fails
- Invalid SQL query
- Client sends bad data
- Server encounters an unexpected problem

`try/catch` blocks handle errors. When an error occurs inside `try`, the code jumps to `catch` instead of crashing.

### HTTP Status Codes for Errors

| Code | Meaning | When to use |
|------|---------|-------------|
| 400 | Bad Request | Client sent invalid data |
| 404 | Not Found | Resource does not exist |
| 500 | Internal Server Error | Something went wrong on the server |

### Implementation

You already have try/catch in each controller function. Here is the complete `todo.controller.js`:

```js
const pool = require("../config/db");

exports.getAllTodos = async (req, res) => {
  try {
    const [todos] = await pool.query("SELECT * FROM todos ORDER BY id DESC");
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Error fetching todos", error: error.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [todos] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);

    if (todos.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todos[0]);
  } catch (error) {
    console.error("Error fetching todo:", error);
    res.status(500).json({ message: "Error fetching todo", error: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const [result] = await pool.query(
      "INSERT INTO todos (title, description) VALUES (?, ?)",
      [title, description]
    );

    res.status(201).json({
      message: "Todo created successfully",
      todoId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Error creating todo", error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const [result] = await pool.query(
      "UPDATE todos SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [title, description, completed, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Error updating todo", error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM todos WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Error deleting todo", error: error.message });
  }
};
```

### Explanation

- `console.error(...)` — Logs the error to the terminal for debugging.
- `error.message` — Sends the error message to the client (useful during development).

### Why Log Errors?

In development, `console.error` helps you see what went wrong. In production, you would use a logging library instead.

---

## 20. Input Validation

### Goal

Reject invalid data before it reaches the database.

### Concept

Always validate user input. Bad data can:

- Cause SQL errors
- Insert meaningless records
- Break your application

Validation happens BEFORE the database query.

### Common Validations for Todos

- `title` is required
- `title` must not be empty
- `completed` must be a boolean

### Implementation

Update `createTodo` in `src/controllers/todo.controller.js`:

```js
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const [result] = await pool.query(
      "INSERT INTO todos (title, description) VALUES (?, ?)",
      [title.trim(), description || ""]
    );

    res.status(201).json({
      message: "Todo created successfully",
      todoId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Error creating todo", error: error.message });
  }
};
```

Update `updateTodo` in `src/controllers/todo.controller.js`:

```js
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const [result] = await pool.query(
      "UPDATE todos SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [title.trim(), description || "", completed || false, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Error updating todo", error: error.message });
  }
};
```

### Test Validation

Send a POST request to `/api/todos` with:

```json
{
  "description": "No title here"
}
```

Expected: Status `400 Bad Request`

```json
{
  "message": "Title is required"
}
```

### Explanation

- `!title` — Checks if title is undefined, null, or empty string
- `title.trim() === ""` — Checks if title is only whitespace
- `title.trim()` — Removes extra spaces before saving

---

## 21. Test Complete CRUD Using Postman

Follow this sequence to test all operations.

### Test 1 — Create Todo

| Setting | Value |
|---------|-------|
| Method | POST |
| URL | `http://localhost:3000/api/todos` |
| Body | `{"title": "Learn Node.js", "description": "Build an API"}` |

Expected: `201 Created`

```json
{
  "message": "Todo created successfully",
  "todoId": 1
}
```

### Test 2 — Create Another Todo

| Setting | Value |
|---------|-------|
| Method | POST |
| URL | `http://localhost:3000/api/todos` |
| Body | `{"title": "Learn MySQL", "description": "Database basics"}` |

Expected: `201 Created`

```json
{
  "message": "Todo created successfully",
  "todoId": 2
}
```

### Test 3 — Get All Todos

| Setting | Value |
|---------|-------|
| Method | GET |
| URL | `http://localhost:3000/api/todos` |

Expected: `200 OK` — Returns array with 2 todos

### Test 4 — Get One Todo

| Setting | Value |
|---------|-------|
| Method | GET |
| URL | `http://localhost:3000/api/todos/1` |

Expected: `200 OK` — Returns the first todo

### Test 5 — Update Todo

| Setting | Value |
|---------|-------|
| Method | PUT |
| URL | `http://localhost:3000/api/todos/1` |
| Body | `{"title": "Master Node.js", "description": "Completed the API", "completed": true}` |

Expected: `200 OK`

```json
{
  "message": "Todo updated successfully"
}
```

### Test 6 — Verify Update

| Setting | Value |
|---------|-------|
| Method | GET |
| URL | `http://localhost:3000/api/todos/1` |

Expected: Returns the updated todo with new title and `completed: true`

### Test 7 — Delete Todo

| Setting | Value |
|---------|-------|
| Method | DELETE |
| URL | `http://localhost:3000/api/todos/1` |

Expected: `200 OK`

```json
{
  "message": "Todo deleted successfully"
}
```

### Test 8 — Verify Deletion

| Setting | Value |
|---------|-------|
| Method | GET |
| URL | `http://localhost:3000/api/todos/1` |

Expected: `404 Not Found`

```json
{
  "message": "Todo not found"
}
```

### Test 9 — Get Remaining Todos

| Setting | Value |
|---------|-------|
| Method | GET |
| URL | `http://localhost:3000/api/todos` |

Expected: Returns array with 1 todo (the second one)

---

## 22. Common Errors and Troubleshooting

### Error: Cannot find module 'express'

**Cause:** Dependencies not installed.

**Solution:**

```bash
npm install
```

### Error: Access denied for user 'root'@'localhost'

**Cause:** Wrong username or password in `.env`.

**Solution:**

1. Check `DB_USER` and `DB_PASSWORD` in `.env`
2. Test login in MySQL command line:
   ```bash
   mysql -u root -p
   ```
3. If you forgot your password, reset it in MySQL

### Error: Unknown database 'todo_db'

**Cause:** Database was not created.

**Solution:**

```sql
CREATE DATABASE todo_db;
```

### Error: ECONNREFUSED

**Cause:** MySQL server is not running.

**Solution:**

1. Start MySQL server
2. On Windows: Services → MySQL → Start
3. On Mac: `brew services start mysql`
4. On Linux: `sudo systemctl start mysql`

### Error: req.body is undefined

**Cause:** Missing JSON middleware.

**Solution:** Make sure this line is in `app.js` BEFORE your routes:

```js
app.use(express.json());
```

### Error: Cannot POST /api/todos

**Cause:** Route not registered or wrong URL.

**Solution:**

1. Check if `app.use("/api/todos", todoRoutes)` is in `app.js`
2. Check the URL — no trailing slash (`/api/todos` not `/api/todos/`)
3. Check the HTTP method (POST not GET)

### Error: ER_BAD_FIELD_ERROR

**Cause:** Column name does not match the table.

**Solution:**

1. Run `DESCRIBE todos;` in MySQL to check column names
2. Make sure SQL query uses correct column names

### Error: Todo not found

**Cause:** The ID does not exist in the database.

**Solution:**

1. Check the ID you are using
2. Run `SELECT * FROM todos;` in MySQL to see all records
3. Make sure you are not using a deleted ID

---

## 23. npm Scripts

### Goal

Add convenient commands to run your server.

### Implementation

Update `package.json` scripts section:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

### Commands

| Command | What it does |
|---------|-------------|
| `npm start` | Runs the server with Node.js |
| `npm run dev` | Runs the server with nodemon (auto-restart on changes) |

### When to Use Each

- Use `npm run dev` during development — it restarts when you save files
- Use `npm start` in production — it runs without auto-restart

---

## 24. Final Project Structure

```text
todo-api/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── todo.controller.js
│   │
│   ├── routes/
│   │   └── todo.routes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
```

---

## 25. Final API Documentation

### Health Check

| Property | Value |
|----------|-------|
| Method | GET |
| URL | `/api/health` |
| Body | None |
| Response | `{"message": "Todo API is running"}` |
| Status | 200 |

### Create Todo

| Property | Value |
|----------|-------|
| Method | POST |
| URL | `/api/todos` |
| Body | `{"title": "string", "description": "string"}` |
| Response | `{"message": "Todo created successfully", "todoId": 1}` |
| Status | 201 (success), 400 (validation error), 500 (server error) |

### Get All Todos

| Property | Value |
|----------|-------|
| Method | GET |
| URL | `/api/todos` |
| Body | None |
| Response | Array of todo objects |
| Status | 200 |

### Get Todo by ID

| Property | Value |
|----------|-------|
| Method | GET |
| URL | `/api/todos/:id` |
| Body | None |
| Response | Single todo object |
| Status | 200 (found), 404 (not found) |

### Update Todo

| Property | Value |
|----------|-------|
| Method | PUT |
| URL | `/api/todos/:id` |
| Body | `{"title": "string", "description": "string", "completed": boolean}` |
| Response | `{"message": "Todo updated successfully"}` |
| Status | 200 (success), 400 (validation error), 404 (not found), 500 (server error) |

### Delete Todo

| Property | Value |
|----------|-------|
| Method | DELETE |
| URL | `/api/todos/:id` |
| Body | None |
| Response | `{"message": "Todo deleted successfully"}` |
| Status | 200 (success), 404 (not found), 500 (server error) |

---

## 26. Learning Checklist

Track your progress:

- [ ] Understand what Node.js is and how to run JavaScript with it
- [ ] Understand what Express is and how it handles HTTP requests
- [ ] Understand what npm is and how to install packages
- [ ] Create an Express server with `express()` and `app.listen()`
- [ ] Understand what a REST API is
- [ ] Understand HTTP methods: GET, POST, PUT, DELETE
- [ ] Understand URL parameters (`:id`)
- [ ] Understand request body (`req.body`)
- [ ] Understand HTTP status codes (200, 201, 400, 404, 500)
- [ ] Create a MySQL database with `CREATE DATABASE`
- [ ] Create a MySQL table with `CREATE TABLE`
- [ ] Understand primary key and AUTO_INCREMENT
- [ ] Understand VARCHAR, TEXT, BOOLEAN, TIMESTAMP
- [ ] Connect Node.js to MySQL using mysql2
- [ ] Use a connection pool for better performance
- [ ] Execute SELECT queries to read data
- [ ] Execute INSERT queries to create data
- [ ] Execute UPDATE queries to modify data
- [ ] Execute DELETE queries to remove data
- [ ] Understand parameterized queries and why they prevent SQL injection
- [ ] Handle errors with try/catch
- [ ] Validate user input before database operations
- [ ] Test APIs with Postman
- [ ] Complete CRUD application — Create, Read, Update, Delete

---

## 27. Beginner Exercises

After completing the main project, try these exercises to deepen your understanding.

### Exercise 1 — Add a Priority Field

Add a `priority` column to the todos table:

```sql
ALTER TABLE todos ADD COLUMN priority ENUM('low', 'medium', 'high') DEFAULT 'medium';
```

Update your CREATE and UPDATE queries to include the priority field.

**What you learn:** ALTER TABLE, ENUM data type, extending an existing schema.

### Exercise 2 — Get Completed Todos

Add a new route:

```
GET /api/todos/completed
```

This returns only todos where `completed = true`.

SQL:

```sql
SELECT * FROM todos WHERE completed = true ORDER BY id DESC;
```

**What you learn:** Filtering with WHERE clause, boolean conditions.

### Exercise 3 — Toggle Completion Status

Add a new route:

```
PATCH /api/todos/:id/complete
```

This toggles the `completed` field between true and false.

SQL:

```sql
UPDATE todos SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP WHERE id = ?;
```

**What you learn:** PATCH method, toggling boolean values, NOT operator.

### Exercise 4 — Search Todos

Add a query parameter:

```
GET /api/todos?search=node
```

This returns todos where the title contains the search text.

SQL:

```sql
SELECT * FROM todos WHERE title LIKE ? ORDER BY id DESC;
```

Use `"%search%"` as the value for the LIKE query.

**What you learn:** Query parameters (`req.query`), LIKE operator, wildcard search.

### Exercise 5 — Pagination

Add pagination:

```
GET /api/todos?page=1&limit=10
```

SQL:

```sql
SELECT * FROM todos ORDER BY id DESC LIMIT ? OFFSET ?;
```

Calculate offset: `offset = (page - 1) * limit`

**What you learn:** LIMIT, OFFSET, pagination logic, query parameters.

### Exercise 6 — Add Description to Health Check

Update the health check to also return the number of todos:

```json
{
  "message": "Todo API is running",
  "totalTodos": 5
}
```

**What you learn:** COUNT query, combining data in responses.

---

## 28. Important Coding Rules

Throughout this project, follow these rules:

1. **Use JavaScript** — Not TypeScript
2. **Use CommonJS** — `require()` and `module.exports`
3. **Use async/await** — Not callbacks or `.then()` chains
4. **Use parameterized queries** — Always use `?` placeholders in SQL
5. **Never concatenate user input into SQL** — Prevents SQL injection
6. **Keep code simple** — No unnecessary abstractions
7. **Use meaningful variable names** — `todos` not `data`, `result` not `res`
8. **Explain code before writing it** — Understand before implementing
9. **Do not use an ORM** — Use raw SQL to learn how databases work
10. **Do not add authentication** — Keep the project focused on CRUD
11. **Do not add frontend code** — This is a backend-only project
12. **Validate input** — Check data before it reaches the database
13. **Handle errors** — Always use try/catch blocks
14. **Use environment variables** — Never hardcode secrets

---

## Summary

You have built a complete Todo CRUD API with:

- Node.js for the runtime
- Express.js for the web server
- MySQL for the database
- mysql2 for database connectivity
- dotenv for configuration management
- Postman for API testing

You understand:

- How to set up a Node.js project
- How to create Express routes and controllers
- How to connect to MySQL and run queries
- How to implement CRUD operations
- How to handle errors and validate input
- How to test APIs with Postman

This foundation prepares you for building more complex APIs with authentication, file uploads, and more advanced features.