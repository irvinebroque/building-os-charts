var React = require('react');
var Timeseries = require('./timeseries.jsx');
var { array, number, string } = React.PropTypes;
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    className: string,
    height: number.isRequired,
    label: string.isRequired,
    series: array.isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      height: 0,
      label: '',
      series: [],
      width: 0
    };
  },

  render: function() {
    return (
      <g className={classNames('timeseries-group', this.props.className)}>
        {this.props.series.map((datum, index) => (
          <Timeseries
            className={datum.className}
            color={datum.color}
            data={datum.data}
            end={datum.end}
            key={index}
            start={datum.start}
            startAtZero={datum.startAtZero}
            type={datum.type} />
        ))}
      </g>
    );
  }

});
