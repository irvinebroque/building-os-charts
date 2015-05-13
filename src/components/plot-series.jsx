var React = require('react');
var { array, func, number, object, oneOf, string } = React.PropTypes;
var classNames = require('classnames');
var PlotPoint = require('./plot-point.jsx');
var Dispatcher = require('../events/dispatcher');
var Events = require('../events/events');

module.exports = React.createClass({

  propTypes: {
    className: string,
    data: array.isRequired,
    height: number.isRequired,
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
    return (
      <g className={classNames('plot-series', this.props.className)}
        style={this.props.style}>

        {this.props.data.map((datum, index) => {

          var x = Math.floor((this.props.tickWidth * index) + this.props.offset);
          if (x % 2 == 0) {
            // 1-pixel tweak for even numbers:
            x--;
          }
          var y = Math.round(this.props.scaleY(datum.value));

          return (
            <PlotPoint className={datum.className}
              active={this.state.activeIndex === index ? true : false}
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
