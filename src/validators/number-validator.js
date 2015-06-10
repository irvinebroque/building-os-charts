module.exports = {

  isValid(value) {
    if (typeof value !== 'number') {
      return false;
    }
    if (value || value === 0) {
      switch (value) {
        case Number.NEGATIVE_INFINITY:
        case Number.POSITIVE_INFINITY:
        case Number.MIN_VALUE:
        case Number.MAX_VALUE:
        case Infinity:
          return false;
        default:
          return true;
      }
    }
  }

};
