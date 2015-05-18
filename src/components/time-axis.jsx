var React = require('react');
var { array, func, number, oneOf } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var classNames = require('classnames');
var moment = require('moment');

var _durations = [{
  duration: moment.duration(365, 'days').asMilliseconds(),
  tickFormat: 'MMM'
},{
  duration: moment.duration(180, 'days').asMilliseconds(),
  tickFormat: 'D'
},{
  duration: moment.duration(90, 'days').asMilliseconds(),
  tickFormat: 'D'
},{
  duration: moment.duration(31, 'days').asMilliseconds(),
  tickFormat: 'D'
},{
  duration: moment.duration(7, 'days').asMilliseconds(),
  tickFormat: 'ddd'
},{
  duration: moment.duration(2, 'days').asMilliseconds(),
  tickFormat: 'ha'
},{
  duration: moment.duration(1, 'day').asMilliseconds(),
  tickFormat: 'ha'
}];

module.exports = React.createClass({

  propTypes: {
    domain: array.isRequired,
    numTicks: number.isRequired,
    offset: number.isRequired,
    orient: oneOf(['bottom']).isRequired,
    scale: func.isRequired,
    tickPadding: number.isRequired,
    tickWidth: number.isRequired,
    width: number.isRequired,
    x: number.isRequired,
    y: number.isRequired
  },

  getDefaultProps: function() {
    return {
      domain: [],
      numTicks: 12,
      offset: 0,
      orient: 'bottom',
      scale: Function,
      tickPadding: 0,
      tickWidth: 0,
      width: 0,
      x: 0,
      y: 0
    };
  },

  getTickFormat: function(domain) {
    var duration = domain[1] - domain[0];
    var tickFormat = '';
    _durations.forEach((datum) => {
      if (duration < datum.duration) {
        tickFormat = datum.tickFormat;
      }
    });
    return tickFormat;
  },

  render: function() {
    var ticks = this.props.scale.ticks(this.props.numTicks);
    var tickFormat = this.getTickFormat(this.props.domain);

    return (
      <g className={classNames('time-axis', this.props.orient)}
        transform={getTranslateFromCoords(this.props.x, this.props.y)}>

        <line className={'time-axis-divider'}
          x1={0} y1={0}
          x2={this.props.width} y2={0} />

        {ticks.map((datum, index) => {
          if (index % 2) {
            return (
              <text className={'time-axis-label'}
                key={index}
                x={Math.floor((this.props.tickWidth * index) + this.props.offset)}
                y={Math.ceil(this.props.tickPadding)}>
                {moment(datum).format(tickFormat)}
              </text>
            )
          }
          return null;
        })}

      </g>
    );
  }

});
