var React = require('react');
var d3 = require('d3');
var { array, bool, func, number, object, oneOf, string } = React.PropTypes;
var { isValid } = require('../validators/number-validator');
var classNames = require('classnames');
var { stretch } = require('../utils/data-util');
var Dispatcher = require('../events/dispatcher');
var Events = require('../events/events');
var LineMarker = require('./line-marker.jsx');

module.exports = React.createClass({

  propTypes: {
    className: string,
    data: array.isRequired,
    height: number.isRequired,
    interaction: oneOf(['none', 'mouseover']),
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
      interaction: 'mouseover',
      interpolate: 'cardinal',
      offset: 0,
      scaleY: Function,
      tickWidth: 0,
      width: 0
    };
  },

  getInitialState: function() {
    return {activeIndex: -1};
  },

  componentDidMount: function() {
    if (this.props.interaction === 'none') {
      return;
    }

    Dispatcher.register((payload) => {
      switch (payload.actionType) {
        case Events.MOUSE_MOVE:
          if (payload.activeIndex !== this.state.activeIndex) {
            this.setState({activeIndex: payload.activeIndex});
          }
          break;
        case Events.MOUSE_OUT:
          if (this.state.activeIndex !== -1) {
            this.setState({activeIndex: -1});
          }
          break;
        default:
          break;
      }
    });
  },

  componentWillUnmount: function() {
    Dispatcher.unregister(Events.MOUSE_MOVE);
    Dispatcher.unregister(Events.MOUSE_OUT);
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

    var data = this.props.stretch ?
      stretch(this.props.data) : this.props.data;

    var activeDatum = data[this.state.activeIndex];

    return (
      <g className={classNames('line-series', this.props.className)}
        style={this.props.style}>

        <path className={'line'}
          d={line(data)} />

        {activeDatum ? (
          <LineMarker
            width={Math.floor(this.props.tickWidth / 2)}
            x={Math.floor((segmentWidth * this.state.activeIndex) + this.props.offset)}
            y={Math.round(this.props.scaleY(activeDatum.value))} />
        ) : null}

      </g>
    );
  }

});
