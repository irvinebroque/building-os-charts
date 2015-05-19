var React = require('react');
var { array, number, string } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var PlotPoint = require('./plot-point.jsx');
var Label = require('./label.jsx');
var Dispatcher = require('../events/dispatcher');
var Events = require('../events/events');
var { format } = require('../formatters/number-formatter');

module.exports = React.createClass({

  propTypes: {
    data: array.isRequired,
    height: number.isRequired,
    label: string.isRequired,
    type: string.isRequired,
    x: number.isRequired
  },

  getDefaultProps: function() {
    return {
      data: [],
      height: 0,
      label: '',
      type: '',
      x: 0
    };
  },

  getInitialState: function() {
    return {readout: ''};
  },

  componentDidMount: function() {
    Dispatcher.register((payload) => {
      switch (payload.actionType) {
        case Events.MOUSE_MOVE:
          var readout = '';
          var activeDatum = this.props.data[payload.activeIndex];
          if (activeDatum) {
            if (activeDatum.valueFormatted) {
              readout = activeDatum.valueFormatted;
            } else {
              readout = format(activeDatum.value);
            }
          }
          if (readout !== this.state.readout) {
            this.setState({readout: readout});
          }
          break;
        case Events.MOUSE_OUT:
          if (this.state.readout !== '') {
            this.setState({readout: ''});
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
    var iconHeight = Math.round(this.props.height / 2);
    var centerY = Math.round(iconHeight / 2);
    var iconWidth = this.props.type === 'plot' ?
      Math.round(centerY * 2) :
      Math.round(this.props.height * 1.5);
    var spacing = Math.round(iconHeight / 2);

    return (
      <g className={'timeseries-legend-item'}
        transform={getTranslateFromCoords(this.props.x, 0)}
        ref={'node'}>

        { this.props.type === 'bar' ||
          this.props.type === 'clusteredBar' ||
          this.props.type === 'differenceBar' ||
          this.props.type === 'stackedBar' ? (
          <rect
            height={iconHeight}
            style={this.props.style}
            width={iconWidth} />
        ) : null}

        {this.props.type === 'area' || this.props.type === 'line' ? (
          <line
            style={this.props.style}
            x1={0}
            y1={centerY}
            x2={iconWidth}
            y2={centerY} />
        ) : null}

        {this.props.type === 'plot' ? (
          <PlotPoint
            height={iconHeight}
            style={this.props.style}
            width={iconHeight}
            x={centerY}
            y={centerY} />
        ) : null}

        {this.props.label ? (
          <Label className={'timeseries-legend-item-label'}
            text={this.props.label}
            x={iconWidth + centerY} />
        ) : null}

        <Label className={'timeseries-legend-item-readout'}
          text={this.state.readout}
          y={iconHeight + spacing} />

      </g>
    );
  }

});
