var React = require('react');
var { number, string } = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    height: number,
    id: string,
    shape: string,
    width: number
  },

  render() {
    if (this.props.shape === 'circle') {
      var radius = Math.ceil(this.props.height / 2);
      return (
        <defs>
          <clippath id={this.props.id}>
            <circle cx={radius} cy={radius} r={radius} />
          </clippath>
        </defs>
      );
    }
    return null;
  }

});
