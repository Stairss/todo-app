import { Button, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Modal } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './Todo.css';
import db from './firebase';
import { useState, forwardRef } from "react";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}))



const Todo = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    };
    const updateTodo = () => {

        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true })

        setOpen(false);
    }

    return (
        <div className="todo" ref={ref}>
            <Modal
                open={open}
                onClose={e => setOpen(false)}
            >
                <div className={classes.paper}>
                    <h1>I am modal</h1>
                    <input placeholder={props.todo.todo} value={input} onChange={e => setInput(e.target.value)} />
                    <Button onClick={updateTodo}>Update Todo</Button>
                </div>
            </Modal>
            <List className="todo__list">
                <ListItem className="todo__content-list">
                    <ListItemText primary={props.todo.todo} secondary='Dummy deadline' className="todo__content" />
                </ListItem>
                <Button onClick={e => setOpen(true)} className="todo__edit-btn">Edit</Button>
                <DeleteForeverIcon onClick={e => db.collection('todos').doc(props.todo.id).delete()} className="todo__delete-btn" />
            </List>

        </div>
    );
})



export default Todo;
