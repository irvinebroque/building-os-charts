var React = require('react');
var TimeseriesGroup = require('../components/timeseries-group.jsx');
var { array, number } = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    groups: array.isRequired,
    height: number.isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      groups: [],
      height: 600,
      width: 800
    };
  },

  render: function() {
    return (
      <svg className={'timeseries-chart'}
        height={this.props.height + 1}
        width={this.props.width + 1}>

        <g className={'timeseries-container'}>
          {this.props.groups.map((datum, index) => (
            <TimeseriesGroup
              className={datum.className}
              label={datum.label}
              key={index}
              series={datum.series}
              showHorizontalAxis={datum.showHorizontalAxis}
              showVerticalAxis={datum.showVerticalAxis} />
          ))}
        </g>

      </svg>
    );
  }

});
