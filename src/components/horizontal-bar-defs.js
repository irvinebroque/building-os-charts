var React = require('react');

module.exports = React.createClass({

  propTypes: {
    height: React.PropTypes.number,
    id: React.PropTypes.string,
    shape: React.PropTypes.string,
    width: React.PropTypes.number
  },

  render: function() {
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
