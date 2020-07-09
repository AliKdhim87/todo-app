import {
  GET_TODOS,
  GET_TODOS_ERROR,
  CREATE_TODOS,
  UPDATE_TODOS,
  DELETE_TODOS,
  CURRENT_TODO,
  CLEAR_CURRENT_TODO,
  CLEAR_ERROR,
} from '../types';
export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case CURRENT_TODO:
      return {
        ...state,
        current: payload,
      };
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
        loading: false,
      };
    case CREATE_TODOS:
      return {
        ...state,
        todos: [...state.todos, payload],
        loading: false,
      };
    case UPDATE_TODOS:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === payload._id ? payload : todo
        ),
        loading: false,
      };
    case DELETE_TODOS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload),
        loading: false,
      };
    case CLEAR_CURRENT_TODO:
      return {
        ...state,
        current: null,
      };
    case GET_TODOS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
