var React = require('react');
var Range = require('../ranges/range');
var LinearDomain = require('../domains/linear-domain');
var LinearScale = require('../scales/linear-scale');
var { numericDescending } = require('../utils/sort-util');
var HorizontalBar = require('../components/horizontal-bar.jsx');
var HorizontalBarDefs = require('../components/horizontal-bar-defs.jsx');

module.exports = React.createClass({

  propTypes: {
    barHeight: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired,
    detailIconHeight: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    iconClipPathId: React.PropTypes.string.isRequired,
    iconHeight: React.PropTypes.number.isRequired,
    sortFunction: React.PropTypes.func.isRequired,
    sortKey: React.PropTypes.string.isRequired,
    startAtZero: React.PropTypes.bool.isRequired,
    verticalSpacing: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      barHeight: 80,
      data: [],
      detailIconHeight: 20,
      height: 600,
      iconClipPathId: 'iconClipPath',
      iconHeight: 80,
      iconShape: 'circle',
      sortFunction: numericDescending,
      sortKey: 'value',
      startAtZero: false,
      verticalSpacing: 6,
      width: 800
    }
  },

  getData: function(data, sortFunction, sortKey) {
    return sortFunction(data.slice(), sortKey);
  },

  getScale: function(data, startAtZero, width) {
    return LinearScale(
      LinearDomain([{data: data}], startAtZero),
      Range(width)
    );
  },

  render: function() {
    var data = this.getData(
      this.props.data,
      this.props.sortFunction,
      this.props.sortKey);

    var scale = this.getScale(data,
      this.props.startAtZero,
      this.props.width);

    return (
      <svg className={'horizontal-bar-chart'}
        height={this.props.height + 1}
        width={this.props.width + 1}>

        <HorizontalBarDefs
          height={this.props.iconHeight}
          id={this.props.iconClipPathId}
          shape={this.props.iconShape}
          width={this.props.iconHeight} />

        <g className={'horizontal-bar-container'}>
          {data.map(function(datum, index) {
            return (
              <HorizontalBar
                corners={datum.corners}
                detailIcon={datum.detailIcon}
                detailIconHeight={this.props.detailIconHeight}
                detailLabel={datum.detailLabel}
                fill={datum.fill}
                height={this.props.barHeight}
                icon={datum.icon}
                iconClipPathId={this.props.iconClipPathId}
                iconHeight={this.props.iconHeight}
                index={index}
                key={index}
                label={datum.label}
                scale={scale}
                stroke={datum.stroke}
                value={datum.value}
                verticalSpacing={this.props.verticalSpacing}
                width={this.props.width}
                x={datum.x} />
            );
          }, this)}
        </g>

      </svg>
    );
  }

});
