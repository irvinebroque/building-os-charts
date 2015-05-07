var React = require('react');
var { array, func, number, string } = React.PropTypes;
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    className: string,
    scale: func.isRequired,
    ticks: array.isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      scale: Function,
      ticks: [],
      width: 0
    };
  },

  render: function() {
    return (
      <g className={classNames('horizontal-grid-lines', this.props.className)}>

        {this.props.ticks.map((datum, index) => {
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
