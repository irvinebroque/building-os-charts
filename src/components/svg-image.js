var React = require('react');
var { number, string } = React.PropTypes;
var { getAttribute, getTranslateFromCoords } = require('../utils/svg-util');

module.exports = React.createClass({

  propTypes: {
    className: string.isRequired,
    clipPathID: string.isRequired,
    height: number.isRequired,
    url: string.isRequired,
    width: number.isRequired,
    x: number.isRequired,
    y: number.isRequired
  },

  getDefaultProps() {
    return {
      clipPathID: '',
      height: 0,
      url: '',
      width: 0,
      x: 0,
      y: 0
    };
  },

  render() {
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
      <g
        className={this.props.className}
        dangerouslySetInnerHTML={{
          __html: '<image ' + attributes.join(' ') + '/>'
        }}
        transform={getTranslateFromCoords(this.props.x, this.props.y)} />
    );
  }

});
