import './App.css';
import { useEffect, useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
    })
  }, [])

  const addTodo = (e) => {
    e.preventDefault()

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('');

  }

  return (
    <div className="App">
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={e => setInput(e.target.value)} />
        </FormControl>
        <Button variant="contained" color="primary" type='submpit' onClick={addTodo} disabled={!input}>
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
