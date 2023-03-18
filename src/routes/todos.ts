import { Router } from 'express';

import { Todo } from '../models/todo';

type RequestBody = { text: string };

let todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    }

    todos.push(newTodo);
    res.status(201).json(newTodo);
})

router.put('/todo', (req, res, next) => {
    const body = req.body as RequestBody;
    const todoId = req.body.id;
    const todoText = body.text;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === todoId);
    if(todoIndex >= 0){
        todos[todoIndex].text = todoText;
        return res.status(200).json({ message: 'Updated todo'});
    }
    else{
        res.status(404).json('Item not Found.');
    }
})

router.delete('/todo', (req, res, next) => {
    const todoId = req.body.id;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === todoId);
    if(todoIndex >= 0){
        todos = todos.filter(todoItem => todoItem.id !== todoId);
        return res.status(200).json({ message: 'Deleted todo'});
    }
    else{
        res.status(404).json('Item not Found.');
    }
})

export default router;