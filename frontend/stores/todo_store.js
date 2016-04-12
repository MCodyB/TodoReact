var TodoStore = {
  _todos: {},

  _callbacks: {},

  changed: () => {
    var keys = Object.keys(TodoStore._callbacks);
    for (let i = keys.length - 1; i >= 0; i--) {
      TodoStore._callbacks[keys[i]].call(TodoStore);
    }
  },

  addChangedHandler: function (callbacks) {
    var keys = Object.keys(callbacks);
    for (var i = keys.length - 1; i >= 0; i--) {
      TodoStore._callbacks[keys[i]] = callbacks[keys[i]]
    }
  },
  removeChangedHandler: function(callbackKeys) {
    for (var i = callbackKeys.length - 1; i >= 0; i--) {
      delete TodoStore._callbacks[callbackKeys[i]]
    }
  },

  all: () => TodoStore._todos,

  fetch: function () {
    $.get("api/todos", "", function(todos) {
      for (var i = todos.length - 1; i >= 0; i--) {
        var todo = todos[i];
        TodoStore._todos[todo.id] = todo;
      }
    });
  },

  create: function (todo) {
    $.post("api/todos", {todo: todo}, function(todo) {
      TodoStore._todos[todo.id] = todo;
    });
    TodoStore.changed();
  },

  destroy: function (id) {
    if (TodoStore._todos[id]) {
      $.ajax({
          url: "api/todos/" + id,
          type: 'DELETE',
          success: function(todo) {
            delete TodoStore._todos[todo.id];
            TodoStore.changed()
          }
      });
    }
  },
  toggleDone: function (id) {
    var todo;
    if (todo = TodoStore._todos[id]) {
      $.ajax({
        url: "api/todos/" + id,
        data: {todo: {done: !todo.done}},
        type: 'DELETE',
        success: function(todo) {
          TodoStore.changed()
        }
      });
    }
  }
};

module.exports = TodoStore;