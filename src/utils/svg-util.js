var { isValid } = require('../validators/number-validator');

module.exports = {

  getCoordsFromTranslate: function(translate) {
    if (translate) {
      var regExp = /\(([^)]+)\)/;
      var matches = regExp.exec(translate);
      if (!matches) {
        return;
      }
      var coords = matches[1].split(',');
      var posX = parseFloat(coords[0]);
      var posY = parseFloat(coords[1]);
      return [posX, posY];
    }
  },

  getTranslateFromCoords: function(posX, posY) {
    if (!isValid(posX) || !isValid(posY)) {
      return;
    }
    return 'translate(' + Math.ceil(posX) + ',' + Math.ceil(posY) + ')';
  }

};
