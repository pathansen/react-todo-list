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
        <h5 className="builtText">
          Built in React <i className="fab fa-react"></i>
        </h5>
        <a className="repoLink" target="_blank" rel="noreferrer noopener" href="https://github.com/pathansen/react-todo-list">
          <h5 className="repoText">
            Code on GitHub <i className="fab fa-github"></i>
          </h5>
          </a>
      </div>

      <div className="list">
        <TodoList />
      </div>

    </div>
  );
}

export default App;
