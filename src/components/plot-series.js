var React = require('react');
var { array, func, number, object, oneOf, string } = React.PropTypes;
var { DATA_HOVER, MOUSE_MOVE, MOUSE_OUT, getNamespaced } = require('../events/events');
var classNames = require('classnames');
var PlotPoint = require('./plot-point');
var Dispatcher = require('../events/dispatcher');

module.exports = React.createClass({

  propTypes: {
    className: string,
    data: array.isRequired,
    height: number.isRequired,
    id: number.isRequired,
    interaction: oneOf(['none', 'mouseover']),
    offset: number.isRequired,
    scaleY: func.isRequired,
    style: object,
    tickWidth: number.isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      data: [],
      height: 0,
      id: 0,
      interaction: 'mouseover',
      legendLabel: '',
      offset: 0,
      scaleX: Function,
      scaleY: Function,
      tickWidth: 0,
      width: 0
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

    Dispatcher.on(getNamespaced(MOUSE_OUT, this.props.id), () => {
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
    return (
      <g className={classNames('plot-series', this.props.className)}
        style={this.props.style}>

        {this.props.data.map((datum, index) => {
          var x = Math.floor((this.props.tickWidth * index) + this.props.offset);
          var y = Math.round(this.props.scaleY(datum.value));

          return (
            <PlotPoint
              active={this.state.activeIndex === index ? true : false}
              className={datum.className}
              index={index}
              key={index}
              style={datum.style}
              timestamp={datum.timestamp}
              value={datum.value}
              valueFormatted={datum.valueFormatted}
              width={Math.round(this.props.tickWidth / 2)}
              x={x}
              y={y} />
          );
        })}

      </g>
    );
  }

});
