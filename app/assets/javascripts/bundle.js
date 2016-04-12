/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	TodoStore = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports) {

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
	      TodoStore._callbacks[keys[i]] = callbacks[keys[i]];
	    }
	  },
	  removeChangedHandler: function (callbackKeys) {
	    for (var i = callbackKeys.length - 1; i >= 0; i--) {
	      delete TodoStore._callbacks[callbackKeys[i]];
	    }
	  },
	
	  all: () => TodoStore._todos,
	
	  fetch: function () {
	    $.get("api/todos", "", function (todos) {
	      for (var i = todos.length - 1; i >= 0; i--) {
	        var todo = todos[i];
	        TodoStore._todos[todo.id] = todo;
	      }
	    });
	  },
	
	  create: function (todo) {
	    $.post("api/todos", { todo: todo }, function (todo) {
	      TodoStore._todos[todo.id] = todo;
	    });
	    TodoStore.changed();
	  },
	
	  destroy: function (id) {
	    if (TodoStore._todos[id]) {
	      $.ajax({
	        url: "api/todos/" + id,
	        type: 'DELETE',
	        success: function (todo) {
	          delete TodoStore._todos[todo.id];
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
	        data: { todo: { done: !todo.done } },
	        type: 'DELETE',
	        success: function (todo) {
	          TodoStore.changed();
	        }
	      });
	    }
	  }
	};
	
	module.exports = TodoStore;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map