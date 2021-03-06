var React = require('react');
var { number, string } = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    height: number.isRequired,
    id: string.isRequired,
    width: number.isRequired
  },

  getDefaultProps() {
    return {
      height: 0,
      id: '',
      width: 0
    };
  },

  render() {
    return (
      <clipPath
        className={'clip-shape'}
        id={this.props.id}>
        <rect
          height={this.props.height}
          width={this.props.width} />
      </clipPath>
    );
  }

});
