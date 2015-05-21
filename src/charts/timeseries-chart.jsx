var React = require('react');
var { array, number, objectOf, oneOfType } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var BoxUtil = require('../utils/box-util');
var TimeseriesGroup = require('../components/timeseries-group.jsx');
var TimeseriesLegend = require('../components/timeseries-legend.jsx');
var InteractionSurface = require('../components/interaction-surface.jsx');
var clone = require('clone');

module.exports = React.createClass({

  propTypes: {
    groups: array.isRequired,
    height: number.isRequired,
    margins: oneOfType([number, objectOf(number)]).isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      groups: [{
        series: [{
          data: []
        }]
      }],
      height: 0,
      margins: 0,
      width: 0
    };
  },

  getGroups: function() {
    var counter = 0;
    var groups = clone(this.props.groups);
    groups.forEach(function(group) {
      group.series.forEach(function(timeseries) {
        counter++;
        timeseries.id = counter;
      });
    });
    return groups;
  },

  getMargins: function(groups, margins) {
    if (groups.length < 2) {
      /*
      The right margin is only used when
      there is more than one group, and
      thus more than one vertical axis.
      */
      margins.right = 0;
    }
    return margins;
  },

  render: function() {
    var groups = this.getGroups();

    var margins = this.getMargins(
      groups, BoxUtil(this.props.margins));

    var contentHeight = Math.ceil(
      this.props.height - margins.top - margins.bottom);

    var contentWidth = Math.ceil(
      this.props.width - margins.left - margins.right);

    var numTicksX = groups[0].series[0].data.length;
    var tickWidth = Math.floor(contentWidth / numTicksX);

    return (
      <svg className={'timeseries-chart', this.props.className}
        height={Math.ceil(this.props.height) + 1}
        width={Math.ceil(this.props.width) + 1}>

        <g className={'timeseries-groups'}
          transform={getTranslateFromCoords(margins.left, margins.top)}>
          {groups.map((datum, index) => (
            <TimeseriesGroup
              clampToZero={datum.clampToZero}
              height={contentHeight}
              index={index}
              label={datum.label}
              key={index}
              margins={margins}
              numTicksX={numTicksX}
              numTicksY={datum.numTicksY}
              series={datum.series}
              style={datum.style}
              tickWidth={tickWidth}
              type={datum.type}
              width={contentWidth} />
          ))}
        </g>

        <TimeseriesLegend
          groups={groups}
          height={Math.round(margins.top)}
          width={contentWidth}
          x={margins.left}
          y={Math.round(margins.top / 4)} />

        <InteractionSurface
          height={contentHeight}
          tickWidth={tickWidth}
          width={contentWidth}
          x={margins.left}
          y={margins.top} />

      </svg>
    );
  }

});
