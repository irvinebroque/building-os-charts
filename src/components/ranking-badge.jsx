var React = require('react');
var classNames = require('classnames');

var _getColorClass = function(index) {
  switch (index) {
    case 0:
      return 'gold';
    case 1:
      return 'silver';
    case 2:
      return 'bronze';
    default:
      return;
  }
};

module.exports = React.createClass({

  propTypes: {
    height: React.PropTypes.number.isRequired,
    index: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      height: 0,
      index: 0
    }
  },

  render: function() {
    var radius = Math.ceil(this.props.height / 2);
    return (
      <g className={'ranking-badge'}>
        <circle className={classNames(
            'ranking-badge-background',
            _getColorClass(this.props.index)
          )}
          cx={radius}
          cy={radius}
          r={radius} />
        <text className={'ranking-badge-text'}
          x={radius}
          y={radius + 1}>
          { this.props.index + 1 }
        </text>
      </g>
    );
  }

});
