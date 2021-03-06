var React = require('react');
var { array, number } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var { isValid } = require('../validators/number-validator');
var { numericAscending } = require('../utils/sort-util');
var clone = require('clone');
var TimeseriesLegendItem = require('./timeseries-legend-item');
var { getLayout } = require('../layouts/flexbox');

var _componentShouldSetLayoutAfterUpdate = false;

module.exports = React.createClass({

  propTypes: {
    groups: array.isRequired,
    height: number.isRequired,
    width: number.isRequired,
    x: number.isRequired,
    y: number.isRequired
  },

  getDefaultProps() {
    return {
      groups: [],
      height: 0,
      x: 0,
      y: 0,
      width: 0
    };
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
    // Prevents an infinite loop:
    if (_componentShouldSetLayoutAfterUpdate) {
      _componentShouldSetLayoutAfterUpdate = false;
      this.setLayout();
    }
  },

  getData(groups) {
    if (groups.length < 2) {
      return numericAscending(groups[0].series, 'legendIndex');
    }

    // FIXME: Surely this can be done more efficiently
    var series = clone(groups.reduce((previous, current) =>
      previous.series.concat(current.series)
    ));
    series.forEach((datum, index) => {
      if (!isValid(datum.legendIndex)) {
        datum.legendIndex = index;
      }
    });
    return numericAscending(series, 'legendIndex');
  },

  setLayout() {
    var node = React.findDOMNode(this.refs.node);
    var childNodes = [].slice.call(node.childNodes);
    var childStyles = [];
    childNodes.forEach(() =>
      childStyles.push({style: {
        marginRight: Math.round(this.props.x / 2)
      }})
    );

    this.setState({
      layout: getLayout(node, {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        height: this.props.height,
        justifyContent: 'flex-start',
        paddingLeft: Math.round(this.props.x / 4),
        width: this.props.width
      }, childStyles)
    });
  },

  render() {
    var data = this.getData(this.props.groups);

    return (
      <g
        className={'timeseries-legend'}
        ref={'node'}
        transform={getTranslateFromCoords(this.props.x, this.props.y)}>

        {data.map((datum, index) => (
          <TimeseriesLegendItem
            data={datum.data}
            height={this.props.height}
            id={datum.id}
            key={index}
            label={datum.legendLabel}
            style={datum.style}
            type={datum.type}
            x={this.state.layout.children ?
              this.state.layout.children[index].left : 0} />
        ))}

      </g>
    );
  }

});
