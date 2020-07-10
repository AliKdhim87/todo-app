import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Jumbotron,
  Card,
  ListGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import TodoContext from "../context/todo/todoContext";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
  const { todos, loading, error, getTodos, clearError } = useContext(
    TodoContext
  );
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Jumbotron>
        <h1 className="text-center">Todo App</h1>
      </Jumbotron>
      <Container>
        <TodoForm />
        <Card>
          <ListGroup variant="flush">
            {showAlert && (
              <Alert
                onClose={() => {
                  setShowAlert(false);
                  clearError();
                }}
                variant="danger"
                dismissible
              >
                <p>{error}</p>
              </Alert>
            )}
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
