var React = require('react');
var { number, object, oneOf, string } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var { format } = require('../formatters/number-formatter');
var { DATA_HOVER, MOUSE_OUT, getNamespaced } = require('../events/events');
var TimeseriesLegendIcon = require('./timeseries-legend-icon');
var TimeseriesLegendLabel = require('./timeseries-legend-label');
var TimeseriesLegendReadout = require('./timeseries-legend-readout');
var Dispatcher = require('../events/dispatcher');

module.exports = React.createClass({

  propTypes: {
    height: number.isRequired,
    id: number.isRequired,
    label: string.isRequired,
    style: object,
    type: oneOf([
      'area',
      'bar',
      'clusteredBar',
      'differenceBar',
      'line',
      'plot',
      'stackedBar'
    ]).isRequired,
    x: number.isRequired
  },

  getDefaultProps() {
    return {
      height: 0,
      id: 0,
      label: '',
      type: '',
      x: 0
    };
  },

  getInitialState() {
    return {readout: ''};
  },

  componentDidMount() {
    this.addEventListeners();
  },

  componentWillUnmount() {
    this.removeEventListeners();
  },

  addEventListeners() {
    Dispatcher.on(getNamespaced(
      DATA_HOVER, 'legend' + this.props.id), (event) => {
        if (event.datum && event.id === this.props.id) {
          var readout = event.datum.valueFormatted ?
            event.datum.valueFormatted :
            format(event.datum.value);
          this.setState({readout: readout});
        }
      });

    Dispatcher.on(getNamespaced(
      MOUSE_OUT, 'legend' + this.props.id), () =>
        this.setState({readout: ''})
    );
  },

  removeEventListeners() {
    Dispatcher.on(getNamespaced(
      DATA_HOVER, 'legend' + this.props.id), null);
    Dispatcher.on(getNamespaced(
      MOUSE_OUT, 'legend' + this.props.id), null);
  },

  render() {
    var iconHeight = Math.round(this.props.height / 2);
    var centerY = Math.round(iconHeight / 2);
    var iconWidth = this.props.type === 'plot' ?
      Math.round(centerY * 2) :
      Math.round(this.props.height * 1.5);
    var spacing = Math.round(iconHeight / 2);

    return (
      <g className={'timeseries-legend-item'}
        ref={'node'}
        transform={getTranslateFromCoords(this.props.x, 0)}>

        <TimeseriesLegendIcon
          height={iconHeight}
          style={this.props.style}
          type={this.props.type}
          width={iconWidth} />

        {this.props.label ? (
          <TimeseriesLegendLabel
            text={this.props.label}
            x={iconWidth + spacing}
            y={centerY} />
        ) : null}

        <TimeseriesLegendReadout
          style={this.props.style}
          text={this.state.readout}
          y={iconHeight + spacing} />

      </g>
    );
  }

});
