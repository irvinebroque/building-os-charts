var React = require('react');
var { array, bool, func, number, string } = React.PropTypes;
var Range = require('../ranges/range');
var LinearDomain = require('../domains/linear-domain');
var LinearScale = require('../scales/linear-scale');
var { numericDescending } = require('../utils/sort-util');
var HorizontalBar = require('../components/horizontal-bar');
var HorizontalBarDefs = require('../components/horizontal-bar-defs');

module.exports = React.createClass({

  propTypes: {
    barHeight: number.isRequired,
    data: array.isRequired,
    detailIconHeight: number.isRequired,
    height: number.isRequired,
    iconClipPathId: string.isRequired,
    iconHeight: number.isRequired,
    iconShape: string.isRequired,
    sortFunction: func.isRequired,
    sortKey: string.isRequired,
    startAtZero: bool.isRequired,
    verticalSpacing: number.isRequired,
    width: number.isRequired
  },

  getDefaultProps() {
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
    };
  },

  getData(data, sortFunction, sortKey) {
    return sortFunction(data.slice(), sortKey);
  },

  getScale(data, startAtZero, width) {
    return new LinearScale(
      new LinearDomain([{data: data}], startAtZero),
      new Range(width)
    );
  },

  render() {
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
          {data.map((datum, index) => (
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
          ))}
        </g>

      </svg>
    );
  }

});
