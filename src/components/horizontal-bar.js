var React = require('react');
var { getTranslateFromCoords } = require('../utils/svg-util');
var HorizontalBarBackground = require('./horizontal-bar-background');
var HorizontalBarContent = require('./horizontal-bar-content');
var HorizontalBarDetail = require('./horizontal-bar-detail');

module.exports = React.createClass({

  propTypes: {
    corners: React.PropTypes.object,
    detailIcon: React.PropTypes.string,
    detailIconHeight: React.PropTypes.number,
    detailLabel: React.PropTypes.string,
    fill: React.PropTypes.string,
    height: React.PropTypes.number.isRequired,
    icon: React.PropTypes.string,
    iconClipPathId: React.PropTypes.string,
    iconHeight: React.PropTypes.number,
    index: React.PropTypes.number.isRequired,
    label: React.PropTypes.string,
    scale: React.PropTypes.func.isRequired,
    stroke: React.PropTypes.string,
    value: React.PropTypes.number.isRequired,
    verticalSpacing: React.PropTypes.number,
    width: React.PropTypes.number.isRequired,
    x: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      value: 0,
      verticalSpacing: 0
    };
  },

  getTranslate: function(barHeight, verticalSpacing, index) {
    var y = (barHeight + verticalSpacing) * index;
    return getTranslateFromCoords(0, Math.ceil(y));
  },

  render: function() {
    return (
      <g className={'horizontal-bar'}
        transform={this.getTranslate(
          this.props.height,
          this.props.verticalSpacing,
          this.props.index)}>

        <HorizontalBarBackground
          corners={this.props.corners}
          fill={this.props.fill}
          height={this.props.height}
          scale={this.props.scale}
          stroke={this.props.stroke}
          value={this.props.value}
          width={this.props.width}
          x={this.props.x} />

        <HorizontalBarContent
          height={this.props.height}
          icon={this.props.icon}
          iconClipPathId={this.props.iconClipPathId}
          iconHeight={this.props.iconHeight}
          index={this.props.index}
          label={this.props.label}
          width={this.props.width} />

        <HorizontalBarDetail
          height={this.props.height}
          icon={this.props.detailIcon}
          iconHeight={this.props.detailIconHeight}
          label={this.props.detailLabel}
          width={this.props.width} />

      </g>
    );
  }

});
