module.exports = {

  DATA_HOVER: 'datahover',
  MOUSE_MOVE: 'mousemove',
  MOUSE_OUT: 'mouseout',

  getNamespaced(type, namespace) {
    if (!type) {
      return '';
    }

    if (!namespace) {
      return type;
    }

    return type + '.' + namespace;
  }

};
