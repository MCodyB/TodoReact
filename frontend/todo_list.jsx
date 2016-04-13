var React     = require("react");
var TodoStore = require('./stores/todo_store');

var TodoList = React.createClass({
  getInitialState: () => { return { todos: function (){
    TodoStore.fetch();
    return TodoStore.all();
  } } },

  render: function () {
    return (
      <div>
        <ul>{ this.state.todos.map(function(todo, i) {
            return <li><span>{todo.title}</span><span>{todo.body}</span></li>
          });
        }
        </ul>
      </div>
    );
  }
});

module.export = TodoList;