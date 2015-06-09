var React = require('react');
var { number, string } = React.PropTypes;
var HorizontalBarIcon = require('./horizontal-bar-icon');
var Label = require('./label');
var { getLayout } = require('../layouts/flexbox');

var _componentShouldSetLayoutAfterUpdate = false;

module.exports = React.createClass({

  propTypes: {
    height: number.isRequired,
    icon: string,
    iconClipPathId: string,
    iconHeight: number,
    index: number.isRequired,
    label: string,
    width: number.isRequired
  },

  getInitialState() {
    return {
      layout: {}
    };
  },

  componentDidMount() {
    this.setLayout();
  },

  componentWillReceiveProps() {
    _componentShouldSetLayoutAfterUpdate = true;
  },

  componentDidUpdate() {
    if (_componentShouldSetLayoutAfterUpdate) {
      _componentShouldSetLayoutAfterUpdate = false;
      this.setLayout();
    }
  },

  setLayout() {
    this.setState({
      layout: getLayout(React.findDOMNode(this.refs.node), {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        height: this.props.height,
        justifyContent: 'flex-start',
        width: this.props.width
      }, [
        {style: {marginLeft: 0}},
        {style: {marginLeft: 10}}
      ])
    });
  },

  render() {
    return (
      <g className={'horizontal-bar-content'} ref="node">

        {this.props.icon ? (
          <HorizontalBarIcon
            {...this.props}
            className={'horizontal-bar-content-icon'}
            x={this.state.layout.children ? this.state.layout.children[0].left : 0}
            y={this.state.layout.children ? this.state.layout.children[0].top : 0} />
        ) : null}

        {this.props.label ? (
          <Label
            className={'horizontal-bar-content-label'}
            text={this.props.label}
            x={this.state.layout.children ? this.state.layout.children[1].left : 0}
            y={this.state.layout.children ? this.state.layout.children[1].top : 0} />
        ) : null}

      </g>
    );
  }

});
