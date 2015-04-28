var React = require('react');
var { getAttribute } = require('../utils/svg-util');

module.exports = React.createClass({

  propTypes: {
    clipPathID: React.PropTypes.string.isRequired,
    height: React.PropTypes.number.isRequired,
    url: React.PropTypes.string.isRequired,
    width: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      clipPathID: '',
      height: 0,
      url: '',
      width: 0
    }
  },

  render: function() {
    // React does not support namespaced attributes. So this:
    var attributes = [
      getAttribute('height', this.props.height),
      getAttribute('width', this.props.width)
    ];
    if (this.props.clipPathID) {
      attributes.push(getAttribute('clip-path', 'url(#' + this.props.clipPathID + ')'));
    }
    if (this.props.url) {
      attributes.push(getAttribute('xlink:href', this.props.url));
    }
    return (
      <g dangerouslySetInnerHTML={{
        __html: '<image ' + attributes.join(' ') + '/>'
      }} />
    );
  }

});
