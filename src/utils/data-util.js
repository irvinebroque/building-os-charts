var clone = require('clone');

module.exports = {

  stretch(data) {
    /*
    Lucid timeseries data is inclusive.
    If you request one day of data, from
    midnight to midnight, in fifteen-minute
    increments, the last reading will be
    at 11:45pm. This creates a rendering
    problem because the last 15 minutes of
    the corresponding chart will be blank.
    This hack clones the last reading
    and assigns it to the very end of the
    period so that line and area charts
    can be rendered edge-to-edge.
    Nasty but necessary.
    */
    if (!data || !data.length || data.length < 2) {
      return data;
    }

    var cloned = clone(data);
    var secondToLast = cloned[data.length - 2];
    var last = cloned[data.length - 1];

    if (!last.timestamp || !secondToLast.timestamp) {
      return data;
    }
    var interval = last.timestamp - secondToLast.timestamp;

    var newLast = clone(last);
    newLast.timestamp.setTime(newLast.timestamp.getTime() + interval);
    cloned.push(newLast);

    return cloned;
  }

};
