import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    // Load todos from local storage when the component mounts, or default to an empty array
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Fetch todos from an API on component mount (only runs once)
  useEffect(() => {
    axios.get('https://mpb4ffdd0bfa321d3a50.free.beeceptor.com/todos')
      .then(response => {
        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setTodos(response.data);
        } else {
          console.error("Received data is not an array:", response.data);
          setTodos([]); // Set to an empty array to avoid errors
        }
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setTodos([]); // Set to an empty array on error
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // Runs whenever `todos` changes

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

      {/* Mapping over todos safely, ensuring it's an array */}
      <ul>
        {(Array.isArray(todos) ? todos : []).map((todo) => (
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
