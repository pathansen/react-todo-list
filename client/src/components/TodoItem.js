import React from "react";

import classes from './TodoItem.module.css'

const todoItem = (props) => {

  const { title, description, creationTime, completed } = props;

  return (
    <div className={classes.item}>
      <h4>{title}</h4>
    </div>
  )
}

export default todoItem;
