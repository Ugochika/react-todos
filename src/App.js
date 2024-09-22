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

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));  
  // }, [todos])

  // Fetch todos from an API on component mount (only runs once)
  useEffect(() => {
    axios.get('https://dummyjson.com/todos')
      .then(response => {
        // Ensure the response data is an array
        setTodos(response.data.todos);
        // if (Array.isArray(response.data)) {
        //   setTodos(response.data.todos);
        // } else {
        //   console.error("Received data is not an array:", response.data);
        // }
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const addTodo = (todo) => {
    const newTodo = {
      id: Math.random(),
      todo: todo,
      completed: false,
      userId: 1
    };
    const updatedTodo = [newTodo, ...todos]
    setTodos(updatedTodo);
    // saveToLocalStorage(updatedTodo)
    setInput("");
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    // saveToLocalStorage(newTodos)
  };

  const markTodo = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.isDone } : todo
    );
    setTodos(newTodos);
    // saveToLocalStorage(newTodos)
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
          <li key={todo.id} className={todo.completed ? "doneTask" : ""}>
            {todo.todo}
            <button onClick={() => markTodo(todo.id)}>
              {todo.completed ? "Undo" : "Done"}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>&times;</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
