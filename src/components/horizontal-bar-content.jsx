var React = require('react');
var HorizontalBarIcon = require('./horizontal-bar-icon.jsx');
var Label = require('./label.jsx');

module.exports = React.createClass({

  propTypes: {
    height: React.PropTypes.number.isRequired,
    icon: React.PropTypes.string,
    iconClipPathId: React.PropTypes.string,
    iconHeight: React.PropTypes.number,
    index: React.PropTypes.number.isRequired,
    label: React.PropTypes.string,
    width: React.PropTypes.number.isRequired
  },

  render: function() {
    return (
      <g className={'horizontal-bar-content'}>

        {this.props.icon ? (
          <HorizontalBarIcon className={'horizontal-bar-content-icon'}
            {...this.props} />
        ) : null}

        {this.props.label ? (
          <Label className={'horizontal-bar-content-label'}
            text={this.props.label} />
        ) : null}

      </g>
    );
  }

});
