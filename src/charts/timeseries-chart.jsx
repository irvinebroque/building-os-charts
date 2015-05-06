var React = require('react');
var TimeseriesGroup = require('../components/timeseries-group.jsx');
var { array, number, object, oneOfType } = React.PropTypes;
var Margins = require('../margins/margins');

module.exports = React.createClass({

  propTypes: {
    groups: array.isRequired,
    height: number.isRequired,
    margins: oneOfType([number, object]),
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      groups: [],
      height: 600,
      margins: 0,
      width: 800
    };
  },

  render: function() {
    var margins = Margins(this.props.margins);

    return (
      <svg className={'timeseries-chart'}
        height={this.props.height + 1}
        width={this.props.width + 1}>

        <g className={'timeseries-container'}>

          {this.props.groups.map((datum, index) => (
            <TimeseriesGroup className={datum.className}
              label={datum.label}
              key={index}
              margins={datum.margins}
              series={datum.series} />
          ))}

        </g>

      </svg>
    );
  }

});
