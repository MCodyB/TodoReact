var React      = require("react");
var ReactDOM   = require("react-dom");
var DoneButton = require("./done_button");


var TodoListItem = React.createClass({

  render: function () {
    var self = this;
    return <div>
      <div>{this.props.item.title}</div><div>{this.props.item.body}</div>
      <button onClick={this.props.handleDestroy}>Delete</button>
      <DoneButton handleDone={this.props.handleDone} done={this.props.item.done} />
    </div>;
  }
});

module.exports = TodoListItem;