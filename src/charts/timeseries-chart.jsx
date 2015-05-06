var React = require('react');
var TimeseriesGroup = require('../components/timeseries-group.jsx');
var { array, number, objectOf, oneOfType, string } = React.PropTypes;
var BoxUtil = require('../utils/box-util');
var { getTranslateFromCoords } = require('../utils/svg-util');
var TimeseriesDefs = require('../components/timeseries-defs.jsx');

module.exports = React.createClass({

  propTypes: {
    groups: array.isRequired,
    height: number.isRequired,
    margins: oneOfType([number, objectOf(number)]).isRequired,
    timeseriesClipPathId: string.isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      groups: [],
      height: 600,
      margins: 0,
      timeseriesClipPathId: 'timeseriesClipPath',
      width: 800
    };
  },

  render: function() {
    var margins = BoxUtil(this.props.margins);

    return (
      <svg className={'timeseries-chart'}
        height={this.props.height + 1}
        width={this.props.width + 1}>

        <TimeseriesDefs
          height={this.props.height}
          id={this.props.timeseriesClipPathId}
          width={this.props.width} />

        <g className={'timeseries-container'}
          clip-path={'url(#' + this.props.timeseriesClipPathId + ')'}
          transform={getTranslateFromCoords(margins.left, margins.top)}>

          {this.props.groups.map((datum, index) => (
            <TimeseriesGroup className={datum.className}
              height={this.props.height - margins.top - margins.bottom}
              label={datum.label}
              key={index}
              margins={datum.margins}
              series={datum.series}
              width={this.props.width - margins.left - margins.right} />
          ))}

        </g>

      </svg>
    );
  }

});
