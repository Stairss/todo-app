import './App.css';
import { useEffect, useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

const App = () => {
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
    <div className="app">
      <form>
        <FormControl className="app__form-control" >
          <InputLabel className="app_label">Write a Todo</InputLabel>
          <Input value={input} onChange={e => setInput(e.target.value)} className="app__input" />
        </FormControl>
        <Button variant="contained" color="primary" type='submit' onClick={addTodo} disabled={!input} className="app__btn">
          Add Todo
        </Button>
      </form>
      <ul>
        <FlipMove>
          {todos.map(todo => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </FlipMove>
      </ul>
    </div>
  );
}

export default App;
