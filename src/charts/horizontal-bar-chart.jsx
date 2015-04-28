var React = require('react');
var Range = require('../ranges/range');
var LinearDomain = require('../domains/linear-domain');
var LinearScale = require('../scales/linear-scale');
var { numericDescending } = require('../utils/sort-util');
var { getTranslateFromCoords } = require('../utils/svg-util');
var Label = require('../components/label.jsx');
var ImageLoader = require('../components/image-loader.jsx');
var RankingBadge = require('../components/ranking-badge.jsx');
var RoundedRect = require('../components/rounded-rect.jsx');

const ICON_CLIP_PATH_ID = 'iconClipPath';

var _getIcon = function(datum) {
  if (!datum.icon) {
    return;
  }
  if (datum.icon === 'rank') {
    return RankingBadge;
  }
  return ImageLoader;
};

var _getTranslate = function(barHeight, verticalSpacing, index) {
  var totalHeight = barHeight + verticalSpacing;
  var posY = Math.ceil(totalHeight * index);
  return getTranslateFromCoords(0, posY);
};

module.exports = React.createClass({

  propTypes: {
    barHeight: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired,
    detailIconHeight: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    iconHeight: React.PropTypes.number.isRequired,
    sortFunction: React.PropTypes.func.isRequired,
    sortKey: React.PropTypes.string.isRequired,
    startAtZero: React.PropTypes.bool.isRequired,
    verticalSpacing: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      barHeight: 0,
      data: [],
      detailIconHeight: 0,
      height: 0,
      iconHeight: 0,
      iconShape: 'circle',
      sortFunction: numericDescending,
      sortKey: 'value',
      startAtZero: false,
      verticalSpacing: 0,
      width: 0
    }
  },

  render: function() {

    var data = this.props.sortFunction(this.props.data.slice(), this.props.sortKey);
    var domain = LinearDomain(data, this.props.startAtZero);
    var range = Range(this.props.width);
    var scale = LinearScale(domain, range);
    var hasIconClipPath = this.props.iconShape === 'circle' ? true : false;
    var iconClipPathSize = Math.ceil(this.props.iconHeight / 2);

    return (
      <svg
        height={this.props.height + 1}
        width={this.props.width + 1}>
        <defs>
          {hasIconClipPath ? (
          <clippath id={ICON_CLIP_PATH_ID}>
            <circle
              cx={iconClipPathSize}
              cy={iconClipPathSize}
              r={iconClipPathSize} />
          </clippath>
          ) : null}
        </defs>
        <g>
          {data.map(function(datum, index) {
            var Icon = _getIcon(datum);
            return (
              <g className={'horizontal-bar'}
                transform={_getTranslate(
                  this.props.barHeight,
                  this.props.verticalSpacing,
                  index)}
                key={index}>

                <g className={'horizontal-bar-background'}>
                  <rect className={'horizontal-bar-background-hit-area'}
                    height={this.props.barHeight}
                    width={this.props.width} />
                  <RoundedRect className={'horizontal-bar-background-fill'}
                    corners={datum.corners}
                    fill={datum.fill}
                    height={this.props.barHeight}
                    stroke={datum.stroke}
                    width={Math.ceil(scale(datum.value))}
                    x={Math.ceil(this.props.barHeight / 2)} />
                </g>

                <g className={'horizontal-bar-content'}>
                  {datum.icon ? (
                    <Icon className={'horizontal-bar-content-icon'}
                      height={this.props.iconHeight}
                      clipPathID={hasIconClipPath ? ICON_CLIP_PATH_ID : null}
                      index={index}
                      url={datum.icon}
                      width={this.props.iconHeight} />
                  ) : null}
                  {datum.label ? (
                    <Label className={'horizontal-bar-content-label'}
                      text={datum.label} />
                  ) : null}
                </g>

                <g className={'horizontal-bar-detail'}>
                  {datum.detailIcon ? (
                    <ImageLoader className={'horizontal-bar-detail-icon'}
                      height={this.props.detailIconHeight}
                      url={datum.detailIcon}
                      width={this.props.detailIconHeight} />
                  ) : null}
                  {datum.detailLabel ? (
                    <Label className={'horizontal-bar-detail-label'}
                      text={datum.detailLabel} />
                  ) : null}
                </g>

              </g>
            );
          }, this)}
        </g>
      </svg>
    );
  }

});
