var React = require('react');
var { number, object } = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    style: object,
    width: number.isRequired,
    x: number.isRequired,
    y: number.isRequired
  },

  getDefaultProps: function() {
    return {
      width: 14,
      x: 0,
      y: 0
    };
  },

  render: function() {
    return (
      <circle className={'line-marker'}
        cx={Math.floor(this.props.x)}
        cy={Math.round(this.props.y)}
        r={Math.floor(this.props.width / 2)}
        style={this.props.style} />
    );
  }

});
