var React = require('react');
var d3 = require('d3');
var { array, bool, func, number, object, oneOf, string } = React.PropTypes;
var { isValid } = require('../validators/number-validator');
var classNames = require('classnames');
var { stretch } = require('../utils/data-util');

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
    offset: number.isRequired,
    scaleY: func.isRequired,
    stretch: bool,
    style: object,
    tickWidth: number.isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      data: [],
      height: 0,
      interpolate: 'cardinal',
      offset: 0,
      scaleY: Function,
      tickWidth: 0,
      width: 0
    };
  },

  render: function() {

    var segmentWidth = this.props.offset ?
      this.props.tickWidth :
      this.props.width / this.props.data.length;

    var line = d3.svg.line()
      .defined((datum) => isValid(datum.value) ? datum.value : null)
      .interpolate(this.props.interpolate)
      .x((datum, index) =>
        Math.floor((segmentWidth * index) + this.props.offset)
      )
      .y((datum) => Math.round(this.props.scaleY(datum.value)));

    var data = this.props.stretch ? stretch(this.props.data) : this.props.data;

    return (
      <g className={classNames('line-series', this.props.className)}
        style={this.props.style}>
        <path d={line(data)} />
      </g>
    );
  }

});
