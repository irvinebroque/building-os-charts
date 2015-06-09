var React = require('react');
var { func, number } = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    numTicks: number.isRequired,
    scale: func.isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      numTicks: 0,
      scale: Function,
      width: 0
    };
  },

  render: function() {
    var ticks = this.props.scale.ticks(this.props.numTicks);

    return (
      <g className={'horizontal-grid-lines'}>
        {ticks.map((datum, index) => {
          var y = Math.ceil(this.props.scale(datum));
          return (
            <line className={'horizontal-grid-line'}
              key={index}
              x1={0} y1={y}
              x2={this.props.width} y2={y} />
          );
        })}
      </g>
    );
  }

});
