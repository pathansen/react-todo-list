import React from 'react';


import { withStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  listItem: {
    border: '1px solid #1772B3',
    borderLeft: '10px solid #1772B3',
    marginBottom: '4px'
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  }
};

const todoItem = (props) => {

  const { index, title, completed, deleteButtonHandler, checkButtonHandler, classes } = props;

  return (
    <div>
      <ListItem
        key={index}
        className = {classes.listItem}
        dense
        button
        onClick={() => checkButtonHandler(index, 'listItem')}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            style={{color: '#1772B3'}}
            checked={completed}
            tabIndex={-1}
            disableRipple
            // inputProps={{ 'aria-labelledby': labelId }}
            onClick={() => checkButtonHandler(index, 'check')} />
        </ListItemIcon>
        <ListItemText
          primary={title}
          style={{'textDecoration': (completed) ? 'line-through' : 'none'}} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="Delete"
            onClick={() => deleteButtonHandler(index)}>
            <DeleteIcon style={{color: '#FF5754'}} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  )
}

export default withStyles(styles)(todoItem)
