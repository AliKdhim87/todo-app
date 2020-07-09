const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
router.get('/', async (req, res) => {
  try {
    const todo = await Todo.find({});
    res.status(200).json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});
router.get('/:todoId', async (req, res) => {
  const todoId = req.params.todoId;
  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).send('There is no todo for this id.');
    }
    res.status(200).json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
router.patch('/:todoId', async (req, res) => {
  const todoId = req.params.todoId;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description'];

  const isValidOpration = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOpration) {
    return res.status(400).send('Invalid Updates!');
  }
  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).send();
    }

    updates.forEach((update) => (todo[update] = req.body[update]));

    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

router.delete('/:todoId', async (req, res) => {
  const todoId = req.params.todoId;

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).send('There is no todo for this id.');
    }

    await todo.remove();

    res.status(200).send('Todo deleted');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
