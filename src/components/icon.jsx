var React = require('react');

var _setHref = function(node, href) {
  React.findDOMNode(node).setAttribute('xlink:href', href);
};

module.exports = React.createClass({

  componentDidUpdate: function() {
    _setHref(this.refs.image, this.props.href);
  },

  componentDidMount: function() {
    _setHref(this.refs.image, this.props.href);
  },

  render: function() {
    return (
      <image ref="image" height={50} width={50} />
    );
  }

});
