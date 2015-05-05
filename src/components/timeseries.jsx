var React = require('react');
var { array, bool, number, object, string } = React.PropTypes;
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    className: string,
    color: string,
    data: array.isRequired,
    end: object.isRequired,
    start: object.isRequired,
    startAtZero: bool.isRequired,
    legendIndex: number,
    legendLabel: string.isRequired
  },

  getDefaultProps: function() {
    var now = new Date();
    return {
      data: [],
      end: now,
      start: now,
      startAtZero: true,
      legendLabel: ''
    };
  },

  render: function() {
    return (
      <g className={classNames('timeseries', this.props.className)}>

      </g>
    );
  }

});
