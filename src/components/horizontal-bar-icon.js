var React = require('react');
var { number, string } = React.PropTypes;
var SvgImage = require('./svg-image');
var RankingBadge = require('./ranking-badge');

module.exports = React.createClass({

  propTypes: {
    height: number.isRequired,
    icon: string,
    iconClipPathId: string,
    iconHeight: number,
    index: number.isRequired,
    width: number.isRequired
  },

  render() {
    if (!this.props.icon) {
      return null;
    }

    switch (this.props.icon) {
      case 'rank':
        return (
          <RankingBadge
            className={this.props.className}
            height={this.props.height}
            index={this.props.index} />
        );
      default:
        return (
          <SvgImage
            className={this.props.className}
            clipPathID={this.props.iconClipPathId}
            height={this.props.iconHeight}
            url={this.props.icon}
            width={this.props.iconHeight} />
        );
    }
  }

});
