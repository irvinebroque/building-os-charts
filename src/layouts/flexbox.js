var cssLayout = require('css-layout');
var assign = require('object-assign');
var { getTranslateFromCoords } = require('../utils/svg-util');

/*

NOTE: flexbox layout works, but should be considered experimental
for now. Tests to come later as it solidifies.

*/

var _applyComputedLayout = function(childNodes, computedLayout) {
  for (var ii = 0, nn = computedLayout.children.length; ii < nn; ii++) {
    var child = computedLayout.children[ii];
    var node = childNodes[ii].node;
    _setPosition(node, child.left, child.top);
  }
};

var _getChildNodes = function(childNodes, childStyles) {
  var styleNodes = [];
  for (var ii = 0, nn = childNodes.length; ii < nn; ii++) {
    var childStyle = childStyles[ii];
    if (!childStyle || !childStyle.style) {
      childStyle = {style: {}};
    }

    var childNode = childNodes[ii];
    if (childNode) {
      var box = childNode.getBBox();
      styleNodes.push({
        node: childNode,
        style: assign({
          height: Math.ceil(box.height),
          width: Math.ceil(box.width)
        }, childStyle.style)
      });
    }
  }
  return styleNodes;
};

var _getPosition = function(node, x, y) {
  switch (node.nodeName) {
    case 'g':
      node.getAttribute('transform', getTranslateFromCoords(x, y));
      break;
    default:
      return {
        x: node.getAttribute('x'),
        y: node.getAttribute('y')
      };
      break;
  }
};

var _setPosition = function(node, x, y) {
  switch (node.nodeName) {
    case 'g':
      node.setAttribute('transform', getTranslateFromCoords(x, y));
      break;
    default:
      node.setAttribute('x', x);
      node.setAttribute('y', y);
      break;
  }
};

module.exports = {
  layout: function(node, parentStyle, childStyles) {
    var childNodes = _getChildNodes(node.childNodes, childStyles);
    _applyComputedLayout(childNodes, cssLayout({
      style: parentStyle,
      children: childNodes
    }));
  }
};
