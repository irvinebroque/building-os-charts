var React = require('react');
var { getRoundedRectPath } = require('../utils/svg-util');

module.exports = React.createClass({

  propTypes: {
    height: React.PropTypes.number.isRequired,
    radiusBottomLeft: React.PropTypes.number.isRequired,
    radiusBottomRight: React.PropTypes.number.isRequired,
    radiusTopLeft: React.PropTypes.number.isRequired,
    radiusTopRight: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      height: 0,
      radiusBottomLeft: 0,
      radiusBottomRight: 0,
      radiusTopLeft: 0,
      radiusTopRight: 0,
      width: 0
    }
  },

  render: function() {

    var data = getRoundedRectPath(
      this.props.width,
      this.props.height,
      {
        bottomLeft: this.props.radiusBottomLeft,
        bottomRight: this.props.radiusBottomRight,
        topLeft: this.props.radiusTopLeft,
        topRight: this.props.radiusTopRight
      });

    return (
      <path className={this.props.className} d={data} />
    );

  }

});
