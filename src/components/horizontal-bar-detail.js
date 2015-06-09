var React = require('react');
var SvgImage = require('./svg-image');
var Label = require('./label');
var { getLayout } = require('../layouts/flexbox');

var _componentShouldSetLayoutAfterUpdate = false;

module.exports = React.createClass({

  propTypes: {
    height: React.PropTypes.number.isRequired,
    icon: React.PropTypes.string,
    iconHeight: React.PropTypes.number,
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

  componentWillReceiveProps: function() {
    _componentShouldSetLayoutAfterUpdate = true;
  },

  componentDidUpdate: function() {
    // Prevents an infinite loop:
    if (_componentShouldSetLayoutAfterUpdate) {
      _componentShouldSetLayoutAfterUpdate = false;
      this.setLayout();
    }
  },

  setLayout: function() {
    this.setState({
      layout: getLayout(React.findDOMNode(this.refs.node), {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        height: this.props.height,
        justifyContent: 'flex-end',
        width: this.props.width
      }, [
        {style: {marginRight: 10}},
        {style: {marginRight: 10}}
      ])
    });
  },

  render: function() {
    return (
      <g className={'horizontal-bar-detail'} ref="node">

        {this.props.label ? (
          <Label className={'horizontal-bar-detail-label'}
            text={this.props.label}
            x={this.state.layout.children ? this.state.layout.children[0].left : 0}
            y={this.state.layout.children ? this.state.layout.children[0].top : 0} />
        ) : null}

        {this.props.icon ? (
          <SvgImage className={'horizontal-bar-detail-icon'}
            height={this.props.iconHeight}
            url={this.props.icon}
            width={this.props.iconHeight}
            x={this.state.layout.children ? this.state.layout.children[1].left : 0}
            y={this.state.layout.children ? this.state.layout.children[1].top : 0} />
        ) : null}

      </g>
    );
  }

});
