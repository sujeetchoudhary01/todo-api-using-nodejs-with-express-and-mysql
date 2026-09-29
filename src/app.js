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
