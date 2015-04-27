var React = require('react');
var layout = require('css-layout');
var { getTranslateFromCoords } = require('../utils/svg-util');
var HorizontalBarIcon = require('../components/horizontal-bar-icon.jsx');
var Label = require('../components/label.jsx');
var Icon = require('../components/icon.jsx');

var _getTranslate = function(props) {
  var totalHeight = props.height + props.verticalSpacing;
  var posY = Math.ceil(totalHeight * props.index);
  return getTranslateFromCoords(0, posY);
};

var _getWidth = function(props) {
  return Math.ceil(props.scale(props.datum.value))
};

module.exports = React.createClass({

  propTypes: {
    datum: React.PropTypes.object.isRequired,
    height: React.PropTypes.number.isRequired,
    iconClipPathID: React.PropTypes.string.isRequired,
    iconHeight: React.PropTypes.number.isRequired,
    index: React.PropTypes.number.isRequired,
    scale: React.PropTypes.func.isRequired,
    verticalSpacing: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
  },

  render: function() {
    return (
      <g className={'horizontal-bar'}
        transform={_getTranslate(this.props)}>

        <g className={'horizontal-bar-background'}>
          <rect className={'horizontal-bar-hit-area'}
            height={this.props.height}
            width={this.props.width} />
          <rect className={'horizontal-bar-fill'}
            height={this.props.height}
            width={_getWidth(this.props)} />
        </g>

        <g className={'horizontal-bar-content'}>
          {this.props.datum.icon ? (
            <Icon className={'horizontal-bar-icon'}
              height={this.props.iconHeight}
              clipPathID={this.props.iconClipPathID}
              url={this.props.datum.icon}
              width={this.props.iconHeight} />
          ) : null}
          {this.props.datum.label ? (
            <Label className={'horizontal-bar-label'}
              text={this.props.datum.label}
              y={Math.round(this.props.height / 2)} />
          ) : null}
        </g>

      </g>
    );
  }

});
