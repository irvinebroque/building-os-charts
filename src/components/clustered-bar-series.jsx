var React = require('react');
var { array, func, number, object, oneOf, string } = React.PropTypes;
var { DATA_HOVER, MOUSE_MOVE, MOUSE_OUT, getNamespaced } = require('../events/events');
var classNames = require('classnames');
var VerticalBar = require('./vertical-bar.jsx');
var { isValid } = require('../validators/number-validator');
var Dispatcher = require('../events/dispatcher');

module.exports = React.createClass({

  propTypes: {
    barSpacing: number,
    className: string,
    data: array.isRequired,
    height: number.isRequired,
    id: number.isRequired,
    index: number.isRequired,
    interaction: oneOf(['none', 'mouseover']),
    numSeries: number.isRequired,
    offset: number.isRequired,
    scaleX: func.isRequired,
    scaleY: func.isRequired,
    style: object,
    tickWidth: number.isRequired,
    type: string.isRequired,
    width: number.isRequired,
    zeroY: number.isRequired
  },

  getDefaultProps: function() {
    return {
      data: [],
      height: 0,
      id: 0,
      index: 0,
      interaction: 'mouseover',
      legendLabel: '',
      numSeries: 0,
      offset: 0,
      scaleX: Function,
      scaleY: Function,
      tickWidth: 0,
      type: '',
      width: 0,
      zeroY: 0
    };
  },

  getInitialState: function() {
    return {activeIndex: -1};
  },

  componentDidMount: function() {
    this.addEventListeners();
  },

  componentDidUpdate: function() {
    this.dispatchEvents();
  },

  componentWillUnmount: function() {
    this.removeEventListeners();
  },

  addEventListeners: function() {
    if (this.props.interaction === 'none') {
      return;
    }

    Dispatcher.on(getNamespaced(MOUSE_MOVE, this.props.id), (event) => {
      this.setState({
        activeDatum: this.props.data[event.activeIndex],
        activeIndex: event.activeIndex
      });
    });

    Dispatcher.on(getNamespaced(MOUSE_OUT, this.props.id), (event) => {
      this.setState({
        activeDatum: undefined,
        activeIndex: -1
      });
    });
  },

  dispatchEvents: function() {
    Dispatcher[DATA_HOVER]({
      type: DATA_HOVER,
      datum: this.state.activeDatum,
      id: this.props.id
    });
  },

  removeEventListeners: function() {
    Dispatcher.on(getNamespaced(MOUSE_MOVE, this.props.id), null);
    Dispatcher.on(getNamespaced(MOUSE_OUT, this.props.id), null);
  },

  render: function() {

    var barSpacing = isValid(this.props.barSpacing) ?
      this.props.barSpacing : Math.floor(this.props.tickWidth / 3);

    var barWidth = Math.floor(
      (this.props.tickWidth - barSpacing) / this.props.numSeries);

    return (
      <g className={classNames('clustered-bar-series', this.props.className)}
        style={this.props.style}>

        {this.props.data.map((datum, index) => {

          var barHeight = Math.round(
            this.props.zeroY - this.props.scaleY(Math.abs(datum.value)));

          var x = Math.floor(
            (this.props.tickWidth * index) +
            (barWidth * this.props.index) +
            this.props.offset
          );

          var y = datum.value > 0 ?
            this.props.zeroY - barHeight :
            this.props.zeroY;

          return (
            <VerticalBar className={datum.className}
              active={this.state.activeIndex === index ? true : false}
              height={barHeight}
              index={index}
              key={index}
              style={datum.style}
              timestamp={datum.timestamp}
              value={datum.value}
              valueFormatted={datum.valueFormatted}
              width={barWidth}
              x={x}
              y={y} />
          );
        })}

      </g>
    );
  }

});
