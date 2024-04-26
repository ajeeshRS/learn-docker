const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Get all todos
app.get("/api/todos", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM todos");
    res.json(results.rows);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a todo
app.post("/api/todos", async (req, res) => {
  const { description } = req.body;
  try {
    const results = await db.query(
      "INSERT INTO todos (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a todo
app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM todos WHERE id = $1", [id]);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
