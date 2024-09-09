
import React, { useState }from 'react'

function App() {
  // an Array that will store the todos
  // Keep track of what the todo is
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (todo) => {
    const newTodo = {
      id: Math.random(),
      todo: todo,
    };

    // Add the todo to the list
    setList([...list, newTodo]);

    // Clear input box
    setInput("");
  };
  // Function to delete Todos
  const deleteTodo = (id) => {
    // Filter out todo with the id
    const newList = list.filter((todo) => todo.id !== id);

    setList(newList);
  }; 

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" 
      // Bind the input variable with the input field
      value={input} 
      // Listen for ant characters and set value of the input state variable
      onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => addTodo(input)}>Add</button>
      <ul>
        {list.map((todo) => (
          <li key={todo.id}>
            {todo.todo}
            <button onClick={() => deleteTodo(todo.id)}>&times;</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App