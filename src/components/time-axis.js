var React = require('react');
var { array, func, number, oneOf } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var classNames = require('classnames');
var moment = require('moment');
var Divider = require('./divider');
var TimeAxisTickLabel = require('./time-axis-tick-label');
var Duration = require('../constants/duration');

module.exports = React.createClass({

  propTypes: {
    data: array.isRequired,
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

  getDefaultProps() {
    return {
      data: [],
      domain: [],
      numTicks: 0,
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

  getRules(domain) {
    var domainDuration = domain[1] - domain[0];
    var rules = {format: 'MMM', frequency: 1};
    if (domainDuration <= Duration.YEAR) {
      rules = {format: 'MMM', frequency: 1};
    }
    if (domainDuration <= Duration.HALF_YEAR) {
      rules = {format: 'MMM', frequency: 1};
    }
    if (domainDuration <= Duration.NINETY_DAYS) {
      rules = {format: 'MMM', frequency: 1};
    }
    if (domainDuration <= Duration.THIRTY_ONE_DAYS) {
      rules = {format: 'D', frequency: 1};
    }
    if (domainDuration <= Duration.WEEK) {
      rules = {format: 'ddd', frequency: 24};
    }
    if (domainDuration <= Duration.FORTY_EIGHT_HOURS) {
      rules = {format: 'ha', frequency: 24};
    }
    if (domainDuration <= Duration.DAY) {
      rules = {format: 'ha', frequency: 12};
    }
    return rules;
  },

  getTickClass(data, index) {
    if (index === 0) {
      return 'first';
    }
    if (index === (data.length - 1)) {
      return 'last';
    }
  },

  getTicks(data, rules) {
    return data.map((datum, index) => {
      if (index % rules.frequency === 0) {
        var tickText = moment(datum.timestamp).format(rules.format);
        switch (tickText) {
          case '12pm':
            return 'Noon';
          case 'Jan':
            if (index) {
              return moment(datum.timestamp).format('MMM YYYY');
            }
            return tickText;
          default:
            return tickText;
        }
      }
      return '';
    });
  },

  getTickX(tickWidth, offset, index) {
    return Math.floor(
      (tickWidth * index) +
      (tickWidth / 2) +
      offset
    );
  },

  render() {
    var rules = this.getRules(this.props.domain);
    var ticks = this.getTicks(this.props.data, rules);

    return (
      <g
        className={classNames('time-axis', this.props.orient)}
        transform={getTranslateFromCoords(this.props.x, this.props.y)}>

        <Divider
          x1={0}
          x2={this.props.width}
          y1={0}
          y2={0} />

        {ticks.map((datum, index) => datum ? (
            <TimeAxisTickLabel
              className={this.getTickClass(this.props.data, index)}
              key={index}
              text={datum}
              x={this.getTickX(this.props.tickWidth, this.props.offset, index)}
              y={Math.ceil(this.props.tickPadding)} />
          ) : null
        )}

      </g>
    );
  }

});
