var React = require('react');
var SvgImage = require('./svg-image.jsx');
var Label = require('./label.jsx');

module.exports = React.createClass({

  propTypes: {
    height: React.PropTypes.number.isRequired,
    icon: React.PropTypes.string,
    iconHeight: React.PropTypes.number,
    label: React.PropTypes.string,
    width: React.PropTypes.number.isRequired
  },

  render: function() {
    return (
      <g className={'horizontal-bar-detail'}>

        {this.props.icon ? (
          <SvgImage className={'horizontal-bar-detail-icon'}
            height={this.props.iconHeight}
            url={this.props.icon}
            width={this.props.iconHeight} />
        ) : null}

        {this.props.label ? (
          <Label className={'horizontal-bar-detail-label'}
            text={this.props.label} />
        ) : null}

      </g>
    );
  }

});
