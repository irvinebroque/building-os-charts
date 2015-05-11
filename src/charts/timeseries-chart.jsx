var React = require('react');
var { array, number, objectOf, oneOfType, string } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var BoxUtil = require('../utils/box-util');
var TimeseriesGroup = require('../components/timeseries-group.jsx');

module.exports = React.createClass({

  propTypes: {
    groups: array.isRequired,
    height: number.isRequired,
    margins: oneOfType([number, objectOf(number)]).isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      groups: [],
      height: 600,
      margins: 20,
      width: 800
    };
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
    var margins = this.getMargins(
      this.props.groups, BoxUtil(this.props.margins));

    var contentHeight = Math.ceil(
      this.props.height - margins.top - margins.bottom);

    var contentWidth = Math.ceil(
      this.props.width - margins.left - margins.right);

    return (
      <svg className={'timeseries-chart'}
        height={Math.ceil(this.props.height) + 1}
        width={Math.ceil(this.props.width) + 1}>

        <g className={'timeseries-groups'}
          transform={getTranslateFromCoords(margins.left, margins.top)}>
          {this.props.groups.map((datum, index) => (
            <TimeseriesGroup
              clampToZero={datum.clampToZero}
              height={contentHeight}
              index={index}
              label={datum.label}
              key={index}
              margins={margins}
              numTicksY={datum.numTicksY}
              series={datum.series}
              type={datum.type}
              width={contentWidth} />
          ))}
        </g>

      </svg>
    );
  }

});
