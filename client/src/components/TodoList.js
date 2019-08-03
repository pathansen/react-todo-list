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

  /**
   * Get data when the component is created (either via HTTP or locally
   * for demo).
   */
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

  /**
   * Remove event listener when component is removed.
   */
  componentWillUnmount = () => {
    document.removeEventListener('keyup', this.handleKeyUp, false);
  }

  /**
   * Bind changes to input field to state.
   *
   * @param {!ObjType} event Click event
   */
  inputChangeHandler = (event) => {
    const currentString = event.target.value;
    const currentChars = currentString.split('');

    this.setState({
      text: currentString,
      numChars: currentString.length,
      allChars: currentChars
     })
  }

  /**
   * Capture `enter` key press to add new item.
   *
   * @param {!ObjType} event Button press event
   */
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

  /**
   * Create new item when `+` button pressed.
   *
   * @param {!ObjType} event Click event
   */
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

  /**
   * POST data to server.
   *
   * @param {string} url URL to POST data to
   * @param {JSON} data data to post to server
   */
  postData = async (url, data) => {
    if (!DEMO) {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    }
  }

  /**
   * Capture delete button press.
   *
   * @param {number} index index of item to be deleted
   */
  deleteButtonHandler = (index) => {
    const { data } = this.state;
    data.splice(index, 1)
    this.setState({ data: data}, () => {
      this.postData('http://localhost:8000/api/todo-list', {'data': data});
    })
  }

  /**
   * Toggle completeness of item when clicked.
   *
   * @param {number} index index of item clicked
   * @param {string} clicked name of item clicked
   */
  checkButtonHandler = (index, clicked) => {
    if (clicked === 'listItem') {
      const { data } = this.state;
      data[index].completed = !data[index].completed;
      this.setState({ data: data}, () => {
        this.postData('http://localhost:8000/api/todo-list', {'data': data});
      })
    }
  }

  /**
   * Get number of items in the list
   *
   * @return {number} number of items in the list
   */
  getNumberItems = () => {
    const { data } = this.state;
    return data.length;
  }

  /**
   * Get number of completed items in the list
   *
   * @return {number} number of completed items in the list
   */
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
        {/* Input field and add button */}
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

        {/* List of items */}
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

        {/* Shows number of completed items */}
        <div style={{color: '#1772B3'}}>
          Completed {this.getNumberCompleted()} of {this.getNumberItems()}
        </div>

      </div>
    )
  }
}

export default TodoList;
