var ReactDOM  = require("react-dom");
var React = require('react');
var TodoList  = require("./todo_list");

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<TodoList />, document.getElementById("b"));
});
