var React = require('react');
var { number, string } = React.PropTypes;
var Label = require('./label');

module.exports = React.createClass({

  propTypes: {
    text: string.isRequired,
    x: number.isRequired,
    y: number.isRequired
  },

  getDefaultProps() {
    return {
      text: '',
      x: 0,
      y: 0
    };
  },

  render() {
    return (
      <Label className={'timeseries-legend-label'}
        text={this.props.text}
        x={this.props.x}
        y={this.props.y} />
    );
  }

});
