import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    // Load todos from local storage when the component mounts
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [
      {
        id: Math.random(),
        text: "This is a simple todo",
        isDone: false
      }
    ];
  });

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    const newTodo = {
      id: Math.random(),
      text: todo,
      isDone: false
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const markTodo = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1 className="text-center mb-4">Todo List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => addTodo(input)}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.isDone ? "doneTask" : ""}>
            {todo.text}
            <button onClick={() => markTodo(todo.id)}>
              {todo.isDone ? "Undo" : "Done"}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>&times;</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
