var React = require('react');

module.exports = React.createClass({

  propTypes: {
    height: React.PropTypes.number,
    id: React.PropTypes.string,
    width: React.PropTypes.number
  },

  render: function() {
    return (
      <defs>
        <clippath id={this.props.id}>
          <rect
            height={this.props.height}
            width={this.props.width} />
        </clippath>
      </defs>
    );
  }

});
