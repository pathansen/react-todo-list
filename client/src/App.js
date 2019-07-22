import React from 'react';
import './App.css';

import TodoList from './components/TodoList'

function App() {
  return (
    <div className="App">

      <div className="title">
        <h1 className="titleText">
          Todo List
        </h1>
      </div>

      <div className="list">
        <TodoList />
      </div>

    </div>
  );
}

export default App;
