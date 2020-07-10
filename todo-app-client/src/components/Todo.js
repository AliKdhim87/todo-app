import React, { useContext, useEffect } from "react";
import {
  Container,
  Jumbotron,
  Card,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import TodoContext from "../context/todo/todoContext";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
  const { todos, loading, getTodos } = useContext(TodoContext);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      <Jumbotron>
        <h1 className="text-center">Todo App</h1>
      </Jumbotron>
      <Container>
        <TodoForm />
        <Card>
          <ListGroup variant="flush">
            {loading && (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            )}
            {!loading && todos.length <= 0 ? (
              <Card>
                <Card.Body className="text-center">There is no todo</Card.Body>
              </Card>
            ) : (
              !loading &&
              todos.map((todo) => <TodoList todo={todo} key={todo._id} />)
            )}
          </ListGroup>
        </Card>
      </Container>
    </>
  );
};

export default Todo;
