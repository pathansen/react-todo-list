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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';

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

  buttonClickHandler = (event) => {
    const { data, text } = this.state;
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
            onClick={this.buttonClickHandler}>
            <AddIcon />
          </IconButton>
        </Paper>

        <div className={classes.listContainer}>
        <List className={classes.list}>
          {data.map((item , index) => {
            const labelId = item.title;

            return (
              <ListItem key={index} dense button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    // checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item.title} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        </div>

      </div>
    )
  }
}

export default TodoList;
