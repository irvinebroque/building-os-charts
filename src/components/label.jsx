var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <text x={this.props.x} y={this.props.y}>
        {this.props.text}
      </text>
    );
  }

});
