import './App.css';
import { useState } from 'react';
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
function App() {
  const [todos, setTodos] = useState(['Take a dogs for a walk', 'Take the rubbish out', 'Make dinner'])
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault()
    setTodos([...todos, input])
    setInput('');


  }

  return (
    <div className="app">
      <h1>hello world</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={e => setInput(e.target.value)} />
        </FormControl>
        <Button variant="contained" color="primary" type='submit' onClick={addTodo} disabled={!input}>
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={Math.random()}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
