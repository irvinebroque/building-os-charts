var React = require('react');
var { number, object, string } = React.PropTypes;
var { getRoundedRectPath } = require('../utils/svg-util');

module.exports = React.createClass({

  propTypes: {
    className: string.isRequired,
    corners: object,
    fill: string,
    height: number.isRequired,
    stroke: string,
    width: number.isRequired,
    x: number,
    y: number
  },

  getDefaultProps() {
    return {
      height: 10,
      width: 10
    };
  },

  render() {
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
      <path
        className={this.props.className}
        d={data}
        style={style} />
    );
  }

});
