import React, { useState } from 'react';
import './App.css'; 

function App() {
  // Declaring a state variable for input and initializing it with an empty string
  const [input, setInput] = useState("");

  // Declaring a state variable 'todos' and initializing it with a single todo item
  const [todos, setTodos] = useState([
    {
      id: Math.random(), // Each todo has a unique ID
      text: "This is a simple todo", // The todo text
      isDone: false // Marks whether the task is done
    }
  ]);

  // Function to add a new todo item
  const addTodo = (todo) => {
    const newTodo = {
      id: Math.random(), // Generating a unique ID for the new todo
      text: todo, // Setting the text from the input
      isDone: false // Newly added todos are not done by default
    };
    setTodos([...todos, newTodo]); // Adding the new todo to the existing list
    setInput(""); // Clearing the input field after adding
  };

  // Function to delete a todo by filtering it out based on its ID
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id); // Filtering out the todo with the given ID
    setTodos(newTodos); // Updating the state with the new list
  };

  // Function to mark a todo as done/undone
  const markTodo = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    ); // Toggling the isDone status for the matched todo
    setTodos(newTodos); // Updating the state with the new list
  };

  return (
    <div className="app">
      <h1 className="text-center mb-4">Todo List</h1>
      {/* Input field for new todos */}
      <input
        type="text"
        value={input} // Binding the input state
        onChange={(e) => setInput(e.target.value)} // Updating the input value as the user types
      />
      {/* Button to add a new todo */}
      <button onClick={() => addTodo(input)}>Add</button>
      
      {/* Displaying the list of todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.isDone ? "doneTask" : ""}>
            {todo.text} {/* Showing the text of the todo */}
            {/* Button to toggle between done/undone */}
            <button onClick={() => markTodo(todo.id)}>
              {todo.isDone ? "Undo" : "Done"} {/* Label changes based on isDone status */}
            </button>
            {/* Button to delete the todo */}
            <button onClick={() => deleteTodo(todo.id)}>&times;</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
