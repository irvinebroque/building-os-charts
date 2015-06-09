var React = require('react');
var { func, number, object, string } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var HorizontalBarBackground = require('./horizontal-bar-background');
var HorizontalBarContent = require('./horizontal-bar-content');
var HorizontalBarDetail = require('./horizontal-bar-detail');

module.exports = React.createClass({

  propTypes: {
    corners: object,
    detailIcon: string,
    detailIconHeight: number,
    detailLabel: string,
    fill: string,
    height: number.isRequired,
    icon: string,
    iconClipPathId: string,
    iconHeight: number,
    index: number.isRequired,
    label: string,
    scale: func.isRequired,
    stroke: string,
    value: number.isRequired,
    verticalSpacing: number,
    width: number.isRequired,
    x: number
  },

  getDefaultProps() {
    return {
      value: 0,
      verticalSpacing: 0
    };
  },

  getTranslate(barHeight, verticalSpacing, index) {
    var y = (barHeight + verticalSpacing) * index;
    return getTranslateFromCoords(0, Math.ceil(y));
  },

  render() {
    return (
      <g
        className={'horizontal-bar'}
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
