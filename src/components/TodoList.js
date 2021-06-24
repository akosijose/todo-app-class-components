import React from "react";
import TodoForm from "./TodoForm";
import { Todo } from "./Todo";

class TodoList extends React.Component {
  state = {
    todos: [],
    todoToShow: "all",
    toggleAllComplete: true,
  };

  addTodo = (todo) => {
    this.setState({
      todos: [todo, ...this.state.todos],
    });
  };

  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          //suppose to update
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          //return wala
          return todo;
        }
      }),
    });
  };

  updateTodoShow = (str) => {
    this.setState({
      todoToShow: str,
    });
  };

  handleDelete = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  removeAllTodosThatAreComplete = () => {
    this.setState({
      todos: this.state.todos.filter((todo) => !todo.complete),
    });
  };

  render() {
    let todos = [];
    if (this.state.todoToShow === "all") {
      todos = this.state.todos;
    } else if (this.state.todoToShow === "active") {
      todos = this.state.todos.filter((isComplete) => !isComplete.complete);
    } else if (this.state.todoToShow === "complete") {
      todos = this.state.todos.filter((isComplete) => isComplete.complete);
    }
    return (
      <div>
        <TodoForm onSubmit={this.addTodo} />
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={() => {
              this.toggleComplete(todo.id);
            }}
            onDelete={() => this.handleDelete(todo.id)}
          />
        ))}
        <div>
          Todos left:{" "}
          {this.state.todos.filter((isComplete) => !isComplete.complete).length}
        </div>
        <div>
          <button onClick={() => this.updateTodoShow("all")}>All</button>
          <button onClick={() => this.updateTodoShow("active")}>Active</button>
          <button onClick={() => this.updateTodoShow("complete")}>
            Complete
          </button>
        </div>
        <div>
          {this.state.todos.some((todo) => todo.complete) ? (
            <button onClick={this.removeAllTodosThatAreComplete}>
              Remove all complete todos
            </button>
          ) : null}
        </div>
        <div>
          <button
            onClick={() => {
              this.setState({
                todos: this.state.todos.map((todo) => ({
                  ...todo,
                  complete: this.state.toggleAllComplete,
                })),
                toggleAllComplete: !this.state.toggleAllComplete,
              });
            }}
          >
            toggle all complete: {`${this.state.toggleAllComplete}`}
          </button>
        </div>
      </div>
    );
  }
}

export default TodoList;
