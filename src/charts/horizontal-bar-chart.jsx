var React = require('react');
var HorizontalBar = require('../components/horizontal-bar.jsx');
var Range = require('../ranges/range');
var LinearDomain = require('../domains/linear-domain');
var LinearScale = require('../scales/linear-scale');

module.exports = React.createClass({

  propTypes: {
    barHeight: React.PropTypes.number.isRequired,
    barSpacing: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number.isRequired,
    iconHeight: React.PropTypes.number.isRequired,
    sortFunction: React.PropTypes.func.isRequired,
    startAtZero: React.PropTypes.bool.isRequired,
    width: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      barHeight: 40,
      barSpacing: 1,
      data: [],
      height: 400,
      iconHeight: 36,
      sortFunction: Function,
      startAtZero: false,
      width: 500
    }
  },

  render: function() {

    var domain = LinearDomain(this.props.data, this.props.startAtZero);
    var range = Range(this.props.width);
    var scale = LinearScale(domain, range);

    return (
      <svg
        height={this.props.height + 1}
        width={this.props.width + 1}>
        <defs>
          <clippath>
            <circle
              cx={this.props.iconHeight}
              cy={this.props.iconHeight}
              r={this.props.iconHeight} />
          </clippath>
        </defs>
        <g>
          {this.props.data.map(function(datum, index) {
            return (
              <HorizontalBar
                barHeight={this.props.barHeight}
                barSpacing={this.props.barSpacing}
                datum={datum}
                index={index}
                key={index}
                scale={scale}
                width={this.props.width} />
            );
          }, this)}
        </g>
      </svg>
    );
  }

});
