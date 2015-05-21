var React = require('react');
var HorizontalBarIcon = require('./horizontal-bar-icon.jsx');
var Label = require('./label.jsx');
var { getLayout } = require('../layouts/flexbox');

var _componentShouldSetLayoutAfterUpdate = false;

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

  getInitialState: function() {
    return {
      layout: {}
    };
  },

  componentDidMount: function() {
    this.setLayout();
  },

  componentDidUpdate: function() {
    if (_componentShouldSetLayoutAfterUpdate) {
      _componentShouldSetLayoutAfterUpdate = false;
      this.setLayout();
    }
  },

  componentWillReceiveProps: function() {
    _componentShouldSetLayoutAfterUpdate = true;
  },

  setLayout: function() {
    this.setState({
      layout: getLayout(React.findDOMNode(this.refs.node), {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        height: this.props.height,
        justifyContent: 'flex-start',
        width: this.props.width
      },[
        {style: {marginLeft: 0}},
        {style: {marginLeft: 10}}
      ])
    });
  },

  render: function() {
    return (
      <g className={'horizontal-bar-content'} ref="node">

        {this.props.icon ? (
          <HorizontalBarIcon className={'horizontal-bar-content-icon'}
            {...this.props}
            x={this.state.layout.children ? this.state.layout.children[0].left : 0}
            y={this.state.layout.children ? this.state.layout.children[0].top : 0} />
        ) : null}

        {this.props.label ? (
          <Label className={'horizontal-bar-content-label'}
            text={this.props.label}
            x={this.state.layout.children ? this.state.layout.children[1].left : 0}
            y={this.state.layout.children ? this.state.layout.children[1].top : 0} />
        ) : null}

      </g>
    );
  }

});
