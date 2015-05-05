var React = require('react');
var Timeseries = require('./timeseries.jsx');
var { array, bool, number, object, string } = React.PropTypes;
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    className: string,
    label: string.isRequired,
    margins: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object
    ]),
    series: array.isRequired
  },

  getDefaultProps: function() {
    return {
      label: '',
      margins: 0,
      series: []
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
