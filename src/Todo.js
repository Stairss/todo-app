import { Button, FormControl, Input, InputLabel, List, ListItem, ListItemText, makeStyles, Modal } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './Todo.css';
import db from './firebase';
import { useState, forwardRef } from "react";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 400,
        position: `absolute`,
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
    }
}))



const Todo = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [input, setInput] = useState();


    const updateTodo = () => {

        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true })
        setInput('')
        setOpen(false);
    }

    return (
        <div>
            <div className="todo" ref={ref}>
                <Modal
                    open={open}
                    onClose={e => setOpen(false)}
                >
                    <div className={classes.paper}>
                        <FormControl className="app__form-control" >
                            <InputLabel className="app_label">Write a Todo</InputLabel>
                            <Input placeholder={props.todo.todo} value={input} onChange={e => setInput(e.target.value)} className="todo__input" />
                        </FormControl>
                        <Button variant="contained" color="primary" type='submit' onClick={updateTodo} disabled={!input} className="todo__btn">
                            Update Todo
                </Button>
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
        </div>
    );
})



export default Todo;
