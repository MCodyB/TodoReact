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
      TodoStore._todos = {};
      for (var i = todos[1].length - 1; i >= 0; i--) {
        var todo = todos[1][i];
        TodoStore._todos[todo.id] = todo;
      }
      TodoStore.changed();
    });
  },

  create: function (todo) {
    $.post("api/todos", {todo: todo}, function(todo) {
      TodoStore._todos[todo.id] = todo;
      TodoStore.changed();
    });
  },

  destroy: function (id) {
    if (TodoStore._todos[id]) {
      $.ajax({
          url: "api/todos/" + id,
          type: 'DELETE',
          success: function(todo) {
            delete TodoStore._todos[id];
            TodoStore.changed();
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
        type: 'PATCH',
        success: function(todo) {
          TodoStore._todos[todo.id].done = todo.done;
          TodoStore.changed();
        }
      });
    }
  }
};

module.exports = TodoStore;