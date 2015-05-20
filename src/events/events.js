module.exports = {

  DATA_HOVER: 'datahover',
  MOUSE_MOVE: 'mousemove',
  MOUSE_OUT: 'mouseout',

  getNamespaced: function(type, namespace) {
    return type + '.' + namespace;
  }

};
