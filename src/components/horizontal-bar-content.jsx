var React = require('react');
var HorizontalBarIcon = require('./horizontal-bar-icon.jsx');
var Label = require('./label.jsx');
var { layout } = require('../layouts/flexbox');

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

  componentDidUpdate: function() {
    this.layout();
  },

  componentDidMount: function() {
    this.layout();
  },

  layout: function() {
    layout(React.findDOMNode(this.refs.node), {
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      height: this.props.height,
      justifyContent: 'flex-start',
      width: this.props.width
    },[
      {style: {marginLeft: 0}},
      {style: {marginLeft: 10}}
    ]);
  },

  render: function() {
    return (
      <g className={'horizontal-bar-content'} ref="node">

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