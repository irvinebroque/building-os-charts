var React = require('react');
var { number, string } = React.PropTypes;
var { layout } = require('../layouts/flexbox');
var PlotPoint = require('./plot-point.jsx');
var Label = require('./label.jsx');
var { getLayout } = require('../layouts/flexbox');
var { getTranslateFromCoords } = require('../utils/svg-util');

module.exports = React.createClass({

  propTypes: {
    height: number.isRequired,
    label: string.isRequired,
    type: string.isRequired,
    x: number.isRequired
  },

  getDefaultProps: function() {
    return {
      height: 0,
      label: '',
      type: '',
      x: 0
    };
  },

  getInitialState: function() {
    return {
      readout: 'hai'
    };
  },

  componentDidMount: function() {
    // add listener
  },

  componentWillUnmount: function() {
    // remove listener
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
