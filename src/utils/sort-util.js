var naturalSort = require('javascript-natural-sort');
var objectPropertyNaturalSort = require('object-property-natural-sort');

module.exports = {

  alphabetical: function(data, key) {
    if (key) {
      data.sort(function(datum1, datum2) {
        var item1 = datum1[key].toLowerCase();
        var item2 = datum2[key].toLowerCase();
        return item1 < item2 ? -1 : item1 > item2 ? 1 : 0;
      });
    } else {
      data.sort();
    }
    return data;
  },

  natural: function(data, key) {
    if (key) {
      data.sort(objectPropertyNaturalSort(key))
    } else {
      data.sort(naturalSort);
    }
    return data;
  },

  numericAscending: function(data, key) {
    data.sort(function(datum1, datum2) {
      if (key) {
        return datum1[key] - datum2[key];
      } else {
        return datum1 - datum2;
      }
    });
    return data;
  },

  numericDescending: function(data, key) {
    data.sort(function(datum1, datum2) {
      if (key) {
        return datum2[key] - datum1[key];
      } else {
        return datum2 - datum1;
      }
    });
    return data;
  }

};