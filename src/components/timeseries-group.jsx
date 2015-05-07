var React = require('react');
var Timeseries = require('./timeseries.jsx');
var { array, bool, number, string } = React.PropTypes;
var classNames = require('classnames');
var LinearDomain = require('../domains/linear-domain');
var TimeDomain = require('../domains/time-domain');
var Range = require('../ranges/range');
var LinearScale = require('../scales/linear-scale');
var TimeScale = require('../scales/time-scale');

module.exports = React.createClass({

  propTypes: {
    className: string,
    height: number.isRequired,
    label: string.isRequired,
    series: array.isRequired,
    startAtZero: bool.isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      height: 0,
      label: '',
      series: [],
      startAtZero: true,
      width: 0
    };
  },

  render: function() {
    var scaleX = TimeScale(
      TimeDomain(this.props.series),
      Range(this.props.width)
    );
    var scaleY = LinearScale(
      LinearDomain(this.props.series, this.props.startAtZero),
      Range(this.props.height, true)
    );

    return (
      <g className={classNames('timeseries-group', this.props.className)}>
        {this.props.series.map((datum, index) => (
          <Timeseries
            className={datum.className}
            color={datum.color}
            data={datum.data}
            key={index}
            scaleX={scaleX}
            scaleY={scaleY}
            type={datum.type} />
        ))}
      </g>
    );
  }

});
