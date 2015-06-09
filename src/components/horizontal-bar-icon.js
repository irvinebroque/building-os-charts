var React = require('react');
var SvgImage = require('./svg-image');
var RankingBadge = require('./ranking-badge');

module.exports = React.createClass({

  propTypes: {
    height: React.PropTypes.number.isRequired,
    icon: React.PropTypes.string,
    iconClipPathId: React.PropTypes.string,
    iconHeight: React.PropTypes.number,
    index: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired
  },

  render: function() {
    if (!this.props.icon) {
      return null;
    }

    switch (this.props.icon) {
      case 'rank':
        return (
          <RankingBadge className={this.props.className}
            height={this.props.height}
            index={this.props.index} />
        );
      default:
        return (
          <SvgImage className={this.props.className}
            height={this.props.iconHeight}
            clipPathID={this.props.iconClipPathId}
            url={this.props.icon}
            width={this.props.iconHeight} />
        );
    }
  }

});
