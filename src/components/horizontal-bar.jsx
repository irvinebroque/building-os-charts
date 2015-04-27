var React = require('react');
var layout = require('css-layout');
var { getTranslateFromCoords } = require('../utils/svg-util');
var HorizontalBarIcon = require('../components/horizontal-bar-icon.jsx');
var Label = require('../components/label.jsx');
var Icon = require('../components/icon.jsx');

var _getTranslate = function(props) {
  var totalHeight = props.barHeight + props.barSpacing;
  var posY = Math.ceil(totalHeight * props.index);
  return getTranslateFromCoords(0, posY);
};

var _getWidth = function(props) {
  return Math.ceil(props.scale(props.datum.value))
};

module.exports = React.createClass({

  propTypes: {
    barHeight: React.PropTypes.number.isRequired,
    barSpacing: React.PropTypes.number,
    detailIconType: React.PropTypes.string,
    detailIconURL: React.PropTypes.string,
    detailLabel: React.PropTypes.string,
    iconType: React.PropTypes.string,
    iconURL: React.PropTypes.string,
    label: React.PropTypes.string,
    value: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      detailIconType: undefined,
      detailIconURL: undefined,
      detailLabel: '',
      iconType: undefined,
      iconURL: undefined,
      label: '',
      value: 0
    };
  },

  render: function() {
    return (
      <g className={'horizontal-bar'}
        transform={_getTranslate(this.props)}>

        <g className={'horizontal-bar-background'}>
          <rect className={'horizontal-bar-hit-area'}
            height={this.props.barHeight}
            width={this.props.width} />
          <rect className={'horizontal-bar-fill'}
            height={this.props.barHeight}
            width={_getWidth(this.props)} />
        </g>

        <g className={'horizontal-bar-content'}>
          {this.props.datum.icon ? (
            <Icon className={'horizontal-bar-icon'}
              href={this.props.datum.icon} />
          ) : null}
          {this.props.datum.label ? (
            <Label className={'horizontal-bar-label'}
              text={this.props.datum.label}
              y={this.props.barHeight / 2} />
          ) : null}
        </g>

        <g className={'horizontal-bar-detail'}>
          {this.props.datum.detailIcon ? (
            <Icon className={'horizontal-bar-detail-icon'}
              href={this.props.datum.icon} />
          ) : null}
          {this.props.datum.detailLabel ? (
            <Label className={'horizontal-bar-deta*il-label'}
              text={this.props.datum.detailLabel}
              y={this.props.barHeight / 2} />
          ) : null}
        </g>

      </g>
    );
  }

});
