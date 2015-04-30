var React = require('react');
var SvgImage = require('./svg-image.jsx');
var Label = require('./label.jsx');
var { layout } = require('../layouts/flexbox');

module.exports = React.createClass({

  propTypes: {
    height: React.PropTypes.number.isRequired,
    icon: React.PropTypes.string,
    iconHeight: React.PropTypes.number,
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
      justifyContent: 'flex-end',
      width: this.props.width
    },[
      {style: {marginRight: 10}},
      {style: {marginRight: 10}}
    ]);
  },

  render: function() {
    return (
      <g className={'horizontal-bar-detail'} ref="node">

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
