var ReactDOM  = require("react-dom");
var React = require('react');

var TodoForm = React.createClass({
  getInitialState: function () {
    return {title: "", body: "", done: false };
  },

  updateTitle: function (e) {
    this.setState({title: e.target.value});
  },

  updateBody: function (e) {
    this.setState({body: e.target.value});
  },

  handleSubmit: function (e) {
    e.preventDefault();
    this.props.handleCreate(this.state);
    this.setState({title: "", body: "", done: false });
  },

  render: function () {
    var title = this.state.title;
    var body  = this.state.body;
    
    return (
      <form id="todo" action="/api/todos" method="post" onSubmit={this.handleSubmit} >
        <input name="todo[title]" type="text" onChange={this.updateTitle} value={title} placeholder="title" />
        <input name="todo[body]"  type="text" onChange={this.updateBody}  value={body}  placeholder="body"  />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = TodoForm;