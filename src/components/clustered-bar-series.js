var React = require('react');
var { array, func, number, object, oneOf, string } = React.PropTypes;
var { DATA_HOVER, MOUSE_MOVE, MOUSE_OUT, getNamespaced } = require('../events/events');
var classNames = require('classnames');
var VerticalBar = require('./vertical-bar');
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

  getDefaultProps() {
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

  getInitialState() {
    return {activeIndex: -1};
  },

  componentDidMount() {
    this.addEventListeners();
  },

  componentDidUpdate() {
    this.dispatchEvents();
  },

  componentWillUnmount() {
    this.removeEventListeners();
  },

  addEventListeners() {
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

  dispatchEvents() {
    Dispatcher[DATA_HOVER]({
      type: DATA_HOVER,
      datum: this.state.activeDatum,
      id: this.props.id
    });
  },

  removeEventListeners() {
    Dispatcher.on(getNamespaced(MOUSE_MOVE, this.props.id), null);
    Dispatcher.on(getNamespaced(MOUSE_OUT, this.props.id), null);
  },

  render() {
    var barSpacing = isValid(this.props.barSpacing) ?
      this.props.barSpacing : Math.floor(this.props.tickWidth / 3);

    var barWidth = Math.floor(
      (this.props.tickWidth - barSpacing) / this.props.numSeries);

    return (
      <g
        className={classNames('clustered-bar-series', this.props.className)}
        style={this.props.style}>

        {this.props.data.map((datum, index) => {
          var barHeight = Math.round(
            this.props.zeroY - this.props.scaleY(Math.abs(datum.value)));

          var x = Math.floor(
            (this.props.tickWidth * index) +
            (barWidth * this.props.index) +
            this.props.offset);
          var y = datum.value > 0 ?
            this.props.zeroY - barHeight :
            this.props.zeroY;

          return (
            <VerticalBar
              active={this.state.activeIndex === index ? true : false}
              className={datum.className}
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
