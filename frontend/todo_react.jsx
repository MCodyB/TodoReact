var ReactDOM  = require("react-dom");
var TodoList  = require("todo_list")

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<TodoList />, document.body);
});
