var React = require('react');
var { number } = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    width: number.isRequired,
    x: number.isRequired,
    y: number.isRequired
  },

  getDefaultProps: function() {
    return {
      width: 0,
      x: 0,
      y: 0
    };
  },

  render: function() {
    var cx = Math.floor(this.props.x);
    if (cx % 2 == 0) {
      // 1-pixel tweak for even numbers:
      cx--;
    }

    return (
      <circle className={'line-marker'}
        cx={cx}
        cy={Math.round(this.props.y)}
        r={Math.floor(this.props.width / 2)} />
    );
  }

});
