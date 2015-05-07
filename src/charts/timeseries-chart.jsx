var React = require('react');
var { array, number, objectOf, oneOfType, string } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var BoxUtil = require('../utils/box-util');
var TimeseriesGroup = require('../components/timeseries-group.jsx');
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
    var contentHeight = Math.ceil(
      this.props.height - margins.top - margins.bottom);
    var contentWidth = Math.ceil(
      this.props.width - margins.left - margins.right);

    return (
      <svg className={'timeseries-chart'}
        height={Math.ceil(this.props.height) + 1}
        width={Math.ceil(this.props.width) + 1}>

        <TimeseriesDefs
          height={contentHeight}
          id={this.props.timeseriesClipPathId}
          width={contentWidth} />

        <g className={'timeseries-groups'}
          clip-path={'url(#' + this.props.timeseriesClipPathId + ')'}
          transform={getTranslateFromCoords(margins.left, margins.top)}>
          {this.props.groups.map((datum, index) => (
            <TimeseriesGroup className={datum.className}
              height={contentHeight}
              index={index}
              label={datum.label}
              key={index}
              margins={margins}
              series={datum.series}
              startAtZero={datum.startAtZero}
              width={contentWidth} />
          ))}
        </g>

      </svg>
    );
  }

});
