var React = require('react');
var { array, number, string } = React.PropTypes;
var classNames = require('classnames');
var VerticalBar = require('./vertical-bar.jsx');

module.exports = React.createClass({

  propTypes: {
    className: string,
    height: number.isRequired,
    series: array.isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      height: 0,
      series: [],
      width: 0
    };
  },

  render: function() {
    return (
      <g className={classNames('bar-series', this.props.className)}
        style={this.props.style}>
        {this.props.data.map((datum, index) => (
          <VerticalBar key={index} />
        ))}
      </g>
    );
  }

});
