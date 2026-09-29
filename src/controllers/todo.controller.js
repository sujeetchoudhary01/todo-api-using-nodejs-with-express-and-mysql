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
