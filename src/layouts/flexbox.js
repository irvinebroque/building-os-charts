var cssLayout = require('css-layout');
var assign = require('object-assign');

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

module.exports = {

  getLayout(node, parentStyle, childStyles) {
    return cssLayout({
      style: parentStyle,
      children: _getChildNodes(node.childNodes, childStyles ? childStyles : [])
    });
  }
};
