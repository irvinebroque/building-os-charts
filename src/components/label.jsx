var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <text className={this.props.className}>{this.props.text}</text>
    );
  }

});
