import React from "react";

export const Todo = (props) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        textDecoration: props.todo.complete ? "line-through" : "",
      }}
      onClick={props.toggleComplete}
    >
      {props.todo.text}
    </div>
    &nbsp; &nbsp;
    <button onClick={props.onDelete}>X</button>
  </div>
);
