import React from 'react';
import './App.css';

import TodoList from './components/TodoList'

function App() {
  return (
    <div className="App">

      <h1>
        Todo List
      </h1>

      <div className="list">
        <TodoList />
      </div>

    </div>
  );
}

export default App;
