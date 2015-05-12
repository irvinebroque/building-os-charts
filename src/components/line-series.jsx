var React = require('react');
var d3 = require('d3');
var { array, func, number, object, oneOf, string } = React.PropTypes;
var { isValid } = require('../validators/number-validator');
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    className: string,
    data: array.isRequired,
    height: number.isRequired,
    interpolate: oneOf([
      // From https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate
      'basis',
      'basis-open',
      'basis-closed',
      'bundle',
      'cardinal',
      'cardinal-open',
      'cardinal-closed',
      'linear',
      'linear-closed',
      'monotone',
      'step',
      'step-before',
      'step-after'
    ]).isRequired,
    scaleY: func.isRequired,
    style: object,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      data: [],
      height: 0,
      interpolate: 'cardinal',
      scaleY: Function,
      width: 0
    };
  },

  render: function() {
    var segmentWidth = Math.floor(this.props.width / this.props.data.length);

    var line = d3.svg.line()
      .defined((datum) => isValid(datum.value) ? datum.value : null)
      .interpolate(this.props.interpolate)
      .x((datum, index) => {
        return Math.floor(
          (segmentWidth * index) +
          (segmentWidth / 2)
        );
      })
      .y((datum) => Math.round(this.props.scaleY(datum.value)));

    return (
      <g className={classNames('line-series', this.props.className)}
        style={this.props.style}>
        <path d={line(this.props.data)} />
      </g>
    );
  }

});
