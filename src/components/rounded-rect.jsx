var React = require('react');
var { getRoundedRectPath } = require('../utils/svg-util');

module.exports = React.createClass({

  propTypes: {
    corners: React.PropTypes.object,
    fill: React.PropTypes.string,
    height: React.PropTypes.number.isRequired,
    stroke: React.PropTypes.string,
    width: React.PropTypes.number.isRequired,
    x: React.PropTypes.number,
    y: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      height: 10,
      width: 10
    }
  },

  render: function() {
    var data = getRoundedRectPath({
      x: this.props.x,
      y: this.props.y,
      width: this.props.width,
      height: this.props.height,
      corners: {
        bottomLeft: this.props.corners.bottomLeft,
        bottomRight: this.props.corners.bottomRight,
        topLeft: this.props.corners.topLeft,
        topRight: this.props.corners.topRight
      }
    });

    var style = {
      fill: this.props.fill,
      stroke: this.props.stroke
    };

    return (
      <path className={this.props.className}
        d={data}
        style={style} />
    );
  }

});
