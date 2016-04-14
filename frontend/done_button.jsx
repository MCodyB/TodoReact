var ReactDOM  = require("react-dom");
var React = require('react');

var DoneButton = React.createClass({

  render: function () {
    return <button onClick={this.props.handleDone}>Done: {this.props.done.toString()}</button>;
  }
});

module.exports = DoneButton;