var React = require('react');
var { number, string } = React.PropTypes;
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    className: string.isRequired,
    height: number.isRequired,
    index: number.isRequired
  },

  getDefaultProps() {
    return {
      height: 0,
      index: 0
    };
  },

  getColorClass(index) {
    switch (index) {
      case 0:
        return 'gold';
      case 1:
        return 'silver';
      case 2:
        return 'bronze';
      default:
        return '';
    }
  },

  render() {
    var radius = Math.ceil(this.props.height / 2);
    var color = this.getColorClass(this.props.index);

    return (
      <g className={classNames('ranking-badge', this.props.className)}>
        <circle
          className={classNames('ranking-badge-background', color)}
          cx={radius}
          cy={radius}
          r={radius} />
        <text
          x={radius}
          y={radius + 1}>
          { this.props.index + 1 }
        </text>
      </g>
    );
  }

});
