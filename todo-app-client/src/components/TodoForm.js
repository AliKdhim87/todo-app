import React, { useState, useContext, useEffect } from "react";

import { Form, Button, Alert } from "react-bootstrap";
import TodoContext from "../context/todo/todoContext";
const TodoForm = () => {
  const {
    createTodo,
    updateTodo,
    clearCurrentTodo,
    current,
    error,
    clearError,
  } = useContext(TodoContext);

  const [todo, setTodo] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const onSubmitTodoHandler = (e) => {
    e.preventDefault();

    if (current) {
      updateTodo(current._id, { description: todo });
      clearCurrentTodo();
    } else {
      createTodo({ description: todo, completed: false });
    }

    setTodo("");
  };
  useEffect(() => {
    if (current !== null) {
      setTodo(current.description);
    } else {
      setTodo("");
    }
    if (error) {
      setShowAlert(true);
    }
  }, [current, error]);

  return (
    <>
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
      <Form onSubmit={onSubmitTodoHandler}>
        <Form.Group>
          <Form.Label>Add Todo</Form.Label>
          <Form.Control
            placeholder="todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </Form.Group>
        <Button className="mb-2" block type="submit" variant="primary">
          {current ? "Update" : "Add todo"}
        </Button>
        {current && (
          <Button
            className="mb-5"
            block
            type="submit"
            variant="secondary"
            onClick={clearCurrentTodo}
          >
            Cancel
          </Button>
        )}
      </Form>
    </>
  );
};

export default TodoForm;
