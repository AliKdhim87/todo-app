import React from 'react';
import TodoState from './context/todo/TodoState';
import Todo from './components/Todo';
function App() {
  return (
    <TodoState>
      <Todo />
    </TodoState>
  );
}

export default App;
