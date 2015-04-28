var React = require('react');
var HorizontalBar = require('../components/horizontal-bar.jsx');
var Range = require('../ranges/range');
var LinearDomain = require('../domains/linear-domain');
var LinearScale = require('../scales/linear-scale');
var { numericDescending } = require('../utils/sort-util');

const ICON_CLIP_PATH_ID = 'iconClipPath';

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
      barHeight: 100,
      data: [],
      detailIconHeight: 75,
      height: 768,
      iconHeight: 75,
      iconShape: 'circle',
      sortFunction: numericDescending,
      sortKey: 'value',
      startAtZero: false,
      verticalSpacing: 1,
      width: 1024
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
            return (
              <HorizontalBar
                datum={datum}
                detailIconHeight={this.props.detailIconHeight}
                height={this.props.barHeight}
                iconClipPathID={hasIconClipPath ? ICON_CLIP_PATH_ID : null}
                iconHeight={this.props.iconHeight}
                index={index}
                key={index}
                scale={scale}
                verticalSpacing={this.props.verticalSpacing}
                width={this.props.width} />
            );
          }, this)}
        </g>
      </svg>
    );
  }

});