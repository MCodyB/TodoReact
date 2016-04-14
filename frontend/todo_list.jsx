var React     = require("react");
var ReactDOM  = require("react-dom");
var TodoStore = require('./stores/todo_store');

var TodoListItem = require("./todo_list_item")
var TodoForm = require("./todo_form")

var TodoList = React.createClass({
  getInitialState: () => { return { todos: TodoStore.all() } },

  componentDidMount: function () {
    TodoStore.addChangedHandler({fetchTodos: this.todosChanged});
    TodoStore.fetch();
    },

  componentWillUnmount: function() {
    TodoStore.removeChangedHandler(["fetchTodos"]);
  },

  todosChanged: function () {
    this.setState({ todos: TodoStore.all() })
  },

  handleDestroy: function (id) {
    TodoStore.destroy(id);
  },

  handleCreate: function (attrsObj) {
    TodoStore.create(attrsObj);
  },

  handleDone: function (id) {
    TodoStore.toggleDone(id)
  },

  render: function () {
    var self = this;
    return (
      <div>
      TODOS:
        { $.map(this.state.todos, function(todo, key) {
            return <TodoListItem
                     key={key}
                     handleDestroy={self.handleDestroy.bind(self, todo.id)}
                     handleDone={self.handleDone.bind(self, todo.id)}
                     item={todo} />;
          })
        }
        New Form:
        <TodoForm handleCreate={this.handleCreate} />
      </div>
    );
  }
});

module.exports = TodoList;