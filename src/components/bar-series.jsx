var React = require('react');
var { array, func, number, object, oneOf, string } = React.PropTypes;
var classNames = require('classnames');
var VerticalBar = require('./vertical-bar.jsx');
var Dispatcher = require('../events/dispatcher');
var Events = require('../events/events');

module.exports = React.createClass({

  propTypes: {
    barSpacing: number.isRequired,
    className: string,
    data: array.isRequired,
    height: number.isRequired,
    interaction: oneOf(['none', 'mouseover']),
    scaleX: func.isRequired,
    scaleY: func.isRequired,
    style: object,
    tickWidth: number.isRequired,
    width: number.isRequired,
    zeroY: number.isRequired
  },

  getDefaultProps: function() {
    return {
      barSpacing: 2,
      data: [],
      height: 0,
      interaction: 'mouseover',
      legendLabel: '',
      scaleX: Function,
      scaleY: Function,
      tickWidth: 0,
      width: 0,
      zeroY: 0
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
          var activeIndex = Math.floor(payload.x / this.props.tickWidth);
          if (activeIndex !== this.state.activeIndex) {
            this.setState({activeIndex: activeIndex});
          }
          break;

        case Events.MOUSE_OUT:
          this.setState({activeIndex: -1});
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
    return (
      <g className={classNames('bar-series', this.props.className)}
        style={this.props.style}>

        {this.props.data.map((datum, index) => {

          var barHeight = Math.round(
            this.props.zeroY - this.props.scaleY(Math.abs(datum.value)));

          var x = Math.floor((this.props.tickWidth * index));

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
              width={this.props.tickWidth - this.props.barSpacing}
              x={x}
              y={y} />
          );
        })}

      </g>
    );
  }

});
