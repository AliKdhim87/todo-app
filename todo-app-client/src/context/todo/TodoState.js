import React, { useReducer } from 'react';
import axios from 'axios';
import TodoContext from './todoContext';
import TodoReducer from './todoReducer';
import {
  GET_TODOS_ERROR,
  GET_TODOS,
  CREATE_TODOS,
  DELETE_TODOS,
  UPDATE_TODOS,
  CURRENT_TODO,
  CLEAR_CURRENT_TODO,
  CLEAR_ERROR,
} from '../types';

const TodoState = (props) => {
  const initialState = {
    todos: [],
    loading: true,
    error: null,
    current: null,
  };
  const [state, dispatch] = useReducer(TodoReducer, initialState);
  const getTodos = async () => {
    try {
      const url = 'http://localhost:5000/api/todo';
      const data = await axios.get(url);
      dispatch({
        type: GET_TODOS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_TODOS_ERROR,
        payload: error.response.data,
      });
    }
  };
  const createTodo = async (todo) => {
    console.log(todo);
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const url = 'http://localhost:5000/api/todo';
      const data = await axios.post(url, todo, config);
      dispatch({
        type: CREATE_TODOS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_TODOS_ERROR,
        payload: error.response.data,
      });
    }
  };
  const updateTodo = async (id, todo) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    try {
      const url = `http://localhost:5000/api/todo/${id}`;
      const data = await axios.patch(url, todo, config);
      dispatch({ type: UPDATE_TODOS, payload: data.data });
    } catch (error) {
      dispatch({
        type: GET_TODOS_ERROR,
        payload: error.response.data,
      });
    }
  };
  const currentTodo = (todo) => {
    dispatch({ type: CURRENT_TODO, payload: todo });
  };

  const clearCurrentTodo = () => {
    dispatch({ type: CLEAR_CURRENT_TODO });
  };

  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  const deleteTodo = async (id, todo) => {
    try {
      const url = `http://localhost:5000/api/todo/${id}`;
      await axios.delete(url);
      dispatch({ type: DELETE_TODOS, payload: id });
    } catch (error) {
      dispatch({
        type: GET_TODOS_ERROR,
        payload: error.response.data,
      });
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        current: state.current,
        getTodos,
        createTodo,
        updateTodo,
        deleteTodo,
        currentTodo,
        clearCurrentTodo,
        clearError,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
export default TodoState;
