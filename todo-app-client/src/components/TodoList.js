import React, { useContext } from 'react';
import TodoContext from '../context/todo/todoContext';
import { ListGroup, Button } from 'react-bootstrap';

const TodoList = ({ todo }) => {
  const { updateTodo, deleteTodo, currentTodo } = useContext(TodoContext);
  const { description, completed } = todo;

  return (
    <ListGroup.Item className={`mb-1 ${completed ? 'completed' : ''}`}>
      {description}
      <div className='float-right'>
        <Button
          onClick={(e) => updateTodo(todo._id, { completed: !completed })}
          className='mr-1'
          variant={`${completed ? 'success' : 'secondary'}`}
          size='sm'
        >
          <i className={`fas fa-${completed ? 'check ' : 'times '} mr-1`}></i>
          {completed ? '  completed' : '  complete'}
        </Button>

        <Button
          className='mr-1'
          variant='danger'
          size='sm'
          onClick={(e) => deleteTodo(todo._id)}
        >
          <i className='far fa-trash-alt'></i>
        </Button>

        <Button variant='warning' size='sm' onClick={(e) => currentTodo(todo)}>
          <i className='far fa-edit'></i>
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default TodoList;
