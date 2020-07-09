import React, { useContext, useEffect, useState } from 'react';
import { Container, Jumbotron, Card, ListGroup } from 'react-bootstrap';
import TodoContext from '../context/todo/todoContext';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
const Todo = () => {
  const { todos, loading, error, getTodos } = useContext(TodoContext);
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <Jumbotron>
        <h1 className='text-center'>Todo App</h1>
      </Jumbotron>
      <Container>
        <TodoForm />
        <Card>
          <ListGroup variant='flush'>
            {todos.length <= 0 ? (
              <Card>
                <Card.Body className='text-center'>There is no todo</Card.Body>
              </Card>
            ) : (
              todos.map((todo) => <TodoList todo={todo} key={todo._id} />)
            )}
          </ListGroup>
        </Card>
      </Container>
    </>
  );
};

export default Todo;
