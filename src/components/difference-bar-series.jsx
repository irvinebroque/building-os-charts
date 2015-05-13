var React = require('react');
var { array, func, number, object, oneOf, string } = React.PropTypes;
var classNames = require('classnames');
var DifferenceBar = require('./difference-bar.jsx');
var Dispatcher = require('../events/dispatcher');
var Events = require('../events/events');

module.exports = React.createClass({

  propTypes: {
    barSpacing: number.isRequired,
    className: string,
    comparisonData: array.isRequired,
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
      comparisonData: [],
      data: [],
      height: 0,
      interaction: 'mouseover',
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
      <g className={classNames('difference-bar-series', this.props.className)}
        style={this.props.style}>

        {this.props.data.map((datum, index) => {

          var barHeight = Math.round(
            this.props.zeroY - this.props.scaleY(Math.abs(datum.value)));

          var x = Math.floor((this.props.tickWidth * index));

          var y = datum.value > 0 ?
            this.props.zeroY - barHeight :
            this.props.zeroY;

          var comparisonDatum = this.props.comparisonData[index];
          var className = datum.value > comparisonDatum.value ? 'higher' : 'lower';
          var fillHeight = Math.round(
            this.props.scaleY(comparisonDatum.value) - y);

          return (
            <DifferenceBar className={className}
              active={this.state.activeIndex === index ? true : false}
              fillHeight={fillHeight}
              height={barHeight}
              index={index}
              key={index}
              style={this.props.style}
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
