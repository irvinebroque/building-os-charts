var React = require('react');
var Timeseries = require('./timeseries.jsx');
var { array, bool, string } = React.PropTypes;
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    className: string,
    label: string.isRequired,
    series: array.isRequired,
    showHorizontalAxis: bool.isRequired,
    showVerticalAxis: bool.isRequired
  },

  getDefaultProps: function() {
    return {
      label: '',
      series: [],
      showHorizontalAxis: true,
      showVerticalAxis: true
    };
  },

  render: function() {
    return (
      <g className={classNames('timeseries-group', this.props.className)}>
        {this.props.series.map((datum, index) => (
          <Timeseries
            className={datum.className}
            label={datum.label}
            key={index}
            series={datum.series}
            showHorizontalAxis={datum.showHorizontalAxis}
            showVerticalAxis={datum.showVerticalAxis} />
        ))}
      </g>
    );
  }

});
