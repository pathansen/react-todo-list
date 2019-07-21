import React from 'react';

import TodoItem from './TodoItem'

class TodoList extends React.Component {

  state = {
    data: [],
    text: ''
  }

  componentDidMount = async () => {
    const resp = await fetch('http://localhost:8000/api/todo-list');
    const data = await resp.json();
    console.log({resp, });
    this.setState({ data: data.data })
  }

  inputChangeHandler = (event) => {
    const currentString = event.target.value;
    const currentChars = currentString.split('');

    this.setState({
      text: currentString,
      numChars: currentString.length,
      allChars: currentChars
     })
  }

  buttonClickHandler = (event) => {
    const { data, text } = this.state;

    const newItem = {
      'title': text,
      'description': 'blank',
      'creation_time': 'blank',
      'completed': false
    }

    data.push(newItem);
    this.setState({ data: data }, () => {
      console.log('[POST]', data);
      this.postData('http://localhost:8000/api/todo-list', {'data': data});
    });
  }

  postData = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    console.log('[POSTED]', response);
  }

  render() {

    const { data } = this.state;

    return (
      <div>

        <div>
          <span>
            <input
              type="text"
              onChange={this.inputChangeHandler}
              value={this.state.text} />
          </span>
          <span>
            <button onClick={this.buttonClickHandler}>Add</button>
          </span>
        </div>

        {data.map((item, index) => {
          return (
            <div key={index}>
              <TodoItem
                title={item.title}
                description={item.description}
                creationTime={item.creation_time}
                completed={item.completed}/>
            </div>
          )
        })}

      </div>
    )
  }
}

export default TodoList;
