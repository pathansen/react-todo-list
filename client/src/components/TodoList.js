import React from 'react';

import TodoItem from './TodoItem'

import classes from './TodoList.module.css'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/FormatListBulleted';
import AddIcon from '@material-ui/icons/AddCircleOutlined';

import List from '@material-ui/core/List';
import demo from './demo.json'

const DEMO = false;

class TodoList extends React.Component {

  state = {
    data: [],
    text: ''
  }

  componentDidMount = async () => {
    if (DEMO) {
      this.setState({ data: demo.data })
    } else {
      const resp = await fetch('http://localhost:8000/api/todo-list');
      const data = await resp.json();
      this.setState({ data: data.data })
    }

    document.addEventListener('keyup', this.handleKeyUp, false);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keyup', this.handleKeyUp, false);
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

  handleKeyUp = (event) => {
    const { data, text } = this.state;

    if (text !== '') {
      if (event.keyCode === 13) {
        const newItem = {
          'title': text,
          'description': 'blank',
          'creation_time': 'blank',
          'completed': false
        }

        data.push(newItem);
        this.setState({
          data: data,
          text: ''
        }, () => {
          console.log('[POST]', data);
          this.postData('http://localhost:8000/api/todo-list', {'data': data});
        });
      }
    }
  }

  buttonClickHandler = (event) => {
    const { data, text } = this.state;

    if (text !== '') {
      const newItem = {
        'title': text,
        'description': 'blank',
        'creation_time': 'blank',
        'completed': false
      }

      data.push(newItem);
      this.setState({
        data: data,
        text: ''
      }, () => {
        console.log('[POST]', data);
        this.postData('http://localhost:8000/api/todo-list', {'data': data});
      });
    }
  }

  postData = async (url, data) => {
    if (!DEMO) {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    }
  }

  deleteButtonHandler = (index) => {
    const { data } = this.state;
    data.splice(index, 1)
    this.setState({ data: data}, () => {
      this.postData('http://localhost:8000/api/todo-list', {'data': data});
    })
  }

  checkButtonHandler = (index, clicked) => {
    if (clicked === 'listItem') {
      const { data } = this.state;
      data[index].completed = !data[index].completed;
      this.setState({ data: data}, () => {
        this.postData('http://localhost:8000/api/todo-list', {'data': data});
      })
    }
  }

  getNumberItems = () => {
    const { data } = this.state;
    return data.length;
  }

  getNumberCompleted = () => {
    const { data } = this.state;

    let completed = 0;
    for (let item of data) {
      if (item.completed)
        completed += 1;
    }
    return completed;
  }

  render() {

    const { data } = this.state;

    return (
      <div>
        <Paper className={classes.root}>
          <IconButton className={classes.iconButton} disabled aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Add new todo item!"
            inputProps={{ 'aria-label': 'Search Google Maps' }}
            onChange={this.inputChangeHandler}
            onKeyPress={this.handleKeyUp}
            value={this.state.text}/>
          <Divider className={classes.divider} />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="Add"
            style={{color: '#1772B3'}}
            onClick={this.buttonClickHandler}>
            <AddIcon />
          </IconButton>
        </Paper>

        <div className={classes.listContainer}>
          <List className={classes.list}>
            {data.map((item , index) => {
              return (
                <TodoItem
                  key={index}
                  index={index}
                  title={item.title}
                  completed={item.completed}
                  deleteButtonHandler={this.deleteButtonHandler}
                  checkButtonHandler={this.checkButtonHandler} />
              );
            })}

          </List>
        </div>

        <div style={{color: '#1772B3'}}>
          Completed {this.getNumberCompleted()} of {this.getNumberItems()}
        </div>

      </div>
    )
  }
}

export default TodoList;
