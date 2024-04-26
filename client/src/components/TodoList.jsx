import React, { useState, useEffect } from "react";
import axios from "axios";
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  const handleAddTodo = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/todos", {
        description,
      });
      setTodos([...todos, response.data]);
      setDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100%",
      }}
    >
      <h1>Todo List</h1>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {/* Ensure that todos is an array before calling map */}
        {Array.isArray(todos) &&
          todos.map((todo) => (
            <li key={todo.id}>
              {todo.description}
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default TodoList;
