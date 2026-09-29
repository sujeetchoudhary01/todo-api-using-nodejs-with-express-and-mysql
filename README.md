# Todo CRUD REST API - Student Notes

This project is a beginner-friendly API for managing tasks. We will build a backend using Node.js, Express.js, and MySQL.

The API will support these operations:
- Create a todo
- Read all todos
- Read one todo by id
- Update a todo
- Delete a todo

---

## Step 1: Understand the project

A Todo app is a simple application where users can manage tasks.

CRUD means:
- Create
- Read
- Update
- Delete

A REST API lets applications talk to each other using HTTP requests.

Example:
- Client sends a request
- Server receives the request
- Server talks to the database
- Database returns data
- Server sends JSON response back

---

## Step 2: Install needed tools

Before coding, make sure you have these installed:

- Node.js
- npm
- MySQL
- Postman (optional but useful for testing)

Check versions:

```bash
node -v
npm -v
mysql --version
```

---

## Step 3: Create the project folder

Open your terminal and run:

```bash
mkdir todo-api
cd todo-api
```

`mkdir` means create a folder.
`cd` means change directory.

---

## Step 4: Initialize the project

Run:

```bash
npm init -y
```

This creates a `package.json` file for your project.

This file stores:
- project information
- installed packages
- scripts

---

## Step 5: Install dependencies

Run:

```bash
npm install express mysql2 dotenv
npm install --save-dev nodemon
```

Packages used:
- `express` = web framework
- `mysql2` = connect to MySQL
- `dotenv` = read environment variables
- `nodemon` = restart server automatically during development

---

## Step 6: Create the folder structure

Create the main folders:

```bash
mkdir -p src/config src/controllers src/routes
```

Project structure:

```text
todo-api/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── todo.controller.js
│   ├── routes/
│   │   └── todo.routes.js
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
```

---

## Step 7: Create the environment file

Create a file called `.env` in the project root:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=todo_db
DB_PORT=3306
```

This file keeps important config values separate from your code.

Create `.gitignore`:

```text
node_modules/
.env
```

---

## Step 8: Create the MySQL database

Open MySQL and run:

```sql
CREATE DATABASE todo_db;
USE todo_db;
```

Then create the table:

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

Explain each field:
- `id` = unique number for each row
- `title` = task title
- `description` = details about the task
- `completed` = true or false
- `created_at` = when the todo was created
- `updated_at` = when it was last updated

---

## Step 9: Connect Node.js to MySQL

Create `src/config/db.js`:

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

This file creates a connection pool so Node.js can talk to MySQL.

---

## Step 10: Create the Express app

Create `src/app.js`:

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

This file sets up the API and JSON parsing.

Create `src/server.js`:

```js
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

This file starts the server.

---

## Step 11: Test the health endpoint

Run the server:

```bash
node src/server.js
```

Open Postman or use curl:

```bash
curl http://localhost:3000/api/health
```

Expected output:

```json
{
  "message": "Todo API is running"
}
```

---

## Step 12: Create the routes

Create `src/routes/todo.routes.js`:

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

Routes are the API URLs:
- `GET /api/todos` = get all todos
- `GET /api/todos/:id` = get one todo
- `POST /api/todos` = create a todo
- `PUT /api/todos/:id` = update a todo
- `DELETE /api/todos/:id` = delete a todo

---

## Step 13: Create the controller

Create `src/controllers/todo.controller.js`:

```js
const pool = require("../config/db");

exports.getAllTodos = async (req, res) => {
  // later
};

exports.getTodoById = async (req, res) => {
  // later
};

exports.createTodo = async (req, res) => {
  // later
};

exports.updateTodo = async (req, res) => {
  // later
};

exports.deleteTodo = async (req, res) => {
  // later
};
```

The controller contains the logic for each route.

---

## Step 14: Create a todo

Add this function to the controller:

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

Test with Postman:

```json
{
  "title": "Learn Node.js",
  "description": "Build an API"
}
```

Send a POST request to:

```text
http://localhost:3000/api/todos
```

Expected response:

```json
{
  "message": "Todo created successfully",
  "todoId": 1
}
```

---

## Step 15: Get all todos

Add this function:

```js
exports.getAllTodos = async (req, res) => {
  try {
    const [todos] = await pool.query("SELECT * FROM todos ORDER BY id DESC");
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Error fetching todos", error: error.message });
  }
};
```

Send a GET request to:

```text
http://localhost:3000/api/todos
```

You should get an array of todos.

---

## Step 16: Get one todo by id

Add this function:

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
    console.error("Error fetching todo:", error);
    res.status(500).json({ message: "Error fetching todo", error: error.message });
  }
};
```

Send a GET request to:

```text
http://localhost:3000/api/todos/1
```

---

## Step 17: Update a todo

Add this function:

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

Example body:

```json
{
  "title": "Learn Node.js and Express",
  "description": "Build a Todo REST API",
  "completed": true
}
```

Send a PUT request to:

```text
http://localhost:3000/api/todos/1
```

---

## Step 18: Delete a todo

Add this function:

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
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Error deleting todo", error: error.message });
  }
};
```

Send a DELETE request to:

```text
http://localhost:3000/api/todos/1
```

---

## Step 19: Error handling

Use `try/catch` blocks in every controller function.

This helps you:
- catch database errors
- avoid crashing the server
- return a useful message to the client

Example:

```js
try {
  // database logic
} catch (error) {
  console.error("Error:", error);
  res.status(500).json({ message: "Something went wrong" });
}
```

---

## Step 20: Validate user input

Before adding data to the database, check if required fields are valid.

For example, title is required:

```js
if (!title || title.trim() === "") {
  return res.status(400).json({ message: "Title is required" });
}
```

This prevents bad data from being stored.

---

## Step 21: Security note

Never write SQL like this:

```js
const sql = `INSERT INTO todos (title) VALUES ('${title}')`;
```

This is dangerous because users can inject SQL.

Always use parameterized queries:

```js
await pool.query("INSERT INTO todos (title) VALUES (?)", [title]);
```

This is much safer.

---

## Step 22: Final project summary

Your project should now:
- run a Node.js server
- connect to MySQL
- receive HTTP requests
- process CRUD operations
- validate input
- return JSON responses

This is a strong beginner project because it teaches:
- backend development
- API design
- database operations
- error handling
- request/response flow

---

## Step 23: Useful scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

Use:
```bash
npm run dev
```
for development, and:
```bash
npm start
```
for production.

---

## Step 24: Checklist for students

Before finishing, make sure you can do all of these:

- [ ] Understand Node.js and Express
- [ ] Create routes for CRUD
- [ ] Connect to MySQL
- [ ] Run SQL queries
- [ ] Create a todo
- [ ] Read all todos
- [ ] Read one todo by id
- [ ] Update a todo
- [ ] Delete a todo
- [ ] Handle errors
- [ ] Validate input
- [ ] Test with Postman

---

## Final words

This project is a good foundation for learning backend development. Once you understand this project, you can build more advanced APIs with authentication, filtering, pagination, and more.
