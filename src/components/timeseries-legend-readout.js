var React = require('react');
var { number, object, string } = React.PropTypes;
var Label = require('./label');

module.exports = React.createClass({

  propTypes: {
    style: object,
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
    var style = {};
    if (this.props.style) {
      style.fill = this.props.style.stroke;
    }

    return (
      <Label className={'timeseries-legend-readout'}
        style={style}
        text={this.props.text}
        x={this.props.x}
        y={this.props.y} />
    );
  }

});
