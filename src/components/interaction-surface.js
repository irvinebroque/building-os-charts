var React = require('react');
var { number } = React.PropTypes;
var d3 = require('d3');
var Dispatcher = require('../events/dispatcher');
var Events = require('../events/events');
var { getTranslateFromCoords } = require('../utils/svg-util');

module.exports = React.createClass({

  propTypes: {
    height: number.isRequired,
    tickWidth: number.isRequired,
    width: number.isRequired,
    x: number.isRequired,
    y: number.isRequired
  },

  getDefaultProps: function() {
    return {
      height: 0,
      tickWidth: 0,
      width: 0,
      x: 0,
      y: 0
    };
  },

  componentDidMount: function() {
    this.addEventListeners();
  },

  componentWillUnmount: function() {
    this.removeEventListeners();
  },

  addEventListeners: function() {
    var node = React.findDOMNode(this.refs.node);
    var mouse = [];

    d3.select(node)
      .on(Events.MOUSE_MOVE, () => {
        mouse = d3.mouse(node);
        Dispatcher[Events.MOUSE_MOVE]({
          type: Events.MOUSE_MOVE,
          activeIndex: Math.floor(mouse[0] / this.props.tickWidth),
          x: mouse[0],
          y: mouse[1]
        });
      })
      .on(Events.MOUSE_OUT, () => {
        mouse = d3.mouse(node);
        Dispatcher[Events.MOUSE_OUT]({
          type: Events.MOUSE_OUT,
          activeIndex: -1,
          x: mouse[0],
          y: mouse[1]
        });
      });
  },

  removeEventListeners: function() {
    var node = React.findDOMNode(this.refs.node);
    d3.select(node)
      .on(Events.MOUSE_MOVE, null)
      .on(Events.MOUSE_OUT, null);
  },

  render: function() {
    return (
      <g className={'interaction-surface'}
        ref={'node'}
        transform={getTranslateFromCoords(this.props.x, this.props.y)}>
        <rect
          height={this.props.height}
          style={{visibility: 'hidden'}}
          width={this.props.width} />
      </g>
    );
  }

});
