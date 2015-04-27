var {
  alphabetical,
  natural,
  numericAscending,
  numericDescending
} = require('../sort-util');


describe('SortUtil', function() {

  it('can sort alphabetically', function() {
    expect(alphabetical).toBeDefined();
    expect(alphabetical([])).toEqual([]);
    expect(alphabetical(['wallaby', 'antelope', 'ibex', 'aardvark', 'sandpiper']))
      .toEqual(['aardvark', 'antelope', 'ibex', 'sandpiper', 'wallaby']);
  });

  it('can sort alphabetically with a key', function() {
    expect(alphabetical).toBeDefined();
    expect(alphabetical([{}])).toEqual([{}]);
    expect(alphabetical([{value: 'wallaby'}, {value: 'antelope'}, {value: 'ibex'}, {value: 'aardvark'}, {value: 'sandpiper'}], 'value'))
      .toEqual([{value: 'aardvark'}, {value: 'antelope'}, {value: 'ibex'}, {value: 'sandpiper'}, {value: 'wallaby'}]);
  });

  it('can sort naturally', function() {
    expect(natural).toBeDefined();
    expect(natural(['wallaby 1', 'wallaby 10', 'foo', 'wallaby 8', 10, 'wallaby 145654654', 'wallaby 0', -1]))
      .toEqual([-1, 10, 'foo', 'wallaby 0', 'wallaby 1', 'wallaby 8', 'wallaby 10', 'wallaby 145654654']);
  });

  it('can sort naturally with a key', function() {
    expect(natural).toBeDefined();
    expect(natural([{value: 'wallaby 1'}, {value: 'wallaby 10'}, {value: 'foo'}, {value: 'wallaby 8'}, {value: 10}, {value: 'wallaby 145654654'}, {value: 'wallaby 0'}, {value: -1}], 'value'))
      .toEqual([{value: -1}, {value: 10}, {value: 'foo'}, {value: 'wallaby 0'}, {value: 'wallaby 1'}, {value: 'wallaby 8'}, {value: 'wallaby 10'}, {value: 'wallaby 145654654'}], 'value'
    );
  });

  it('can sort ascending numerically', function() {
    expect(numericAscending).toBeDefined();
    expect(numericAscending([])).toEqual([]);
    expect(numericAscending([0, 0])).toEqual([0, 0]);
    expect(numericAscending([1, 1])).toEqual([1, 1]);
    expect(numericAscending([-1, -1])).toEqual([-1, -1]);
    expect(numericAscending([1, -1])).toEqual([-1, 1]);
    expect(numericAscending([0, 1])).toEqual([0, 1]);
    expect(numericAscending([1, 0])).toEqual([0, 1]);
    expect(numericAscending([-1, 0])).toEqual([-1, 0]);
    expect(numericAscending([-1, undefined])).toEqual([-1, undefined]);
    expect(numericAscending([undefined, -1])).toEqual([-1, undefined]);
    expect(numericAscending([Infinity, -1])).toEqual([-1, Infinity]);
    expect(numericAscending([-1, Infinity])).toEqual([-1, Infinity]);
    expect(numericAscending([-1, Number.MAX_VALUE])).toEqual([-1, Number.MAX_VALUE]);
    expect(numericAscending([Number.MAX_VALUE, -1])).toEqual([-1, Number.MAX_VALUE]);
    expect(numericAscending([Infinity, Number.MAX_VALUE])).toEqual([Number.MAX_VALUE, Infinity]);
    expect(numericAscending([0, 5, 3, 2, 4, 1])).toEqual([0, 1, 2, 3, 4, 5]);
    expect(numericAscending([0, -2, 1, 2, -1, 3])).toEqual([-2, -1, 0, 1, 2, 3]);
  });

  it('can sort ascending numerically with a key', function() {
    expect(numericAscending).toBeDefined();
    expect(numericAscending([])).toEqual([]);
    expect(numericAscending([{value: 1}, {value: 1}], 'value')).toEqual([{value: 1}, {value: 1}]);
    expect(numericAscending([{value: -1}, {value: -1}], 'value')).toEqual([{value: -1}, {value: -1}]);
    expect(numericAscending([{value: 1}, {value: -1}], 'value')).toEqual([{value: -1}, {value: 1}]);
    expect(numericAscending([{value: 0}, {value: 1}], 'value')).toEqual([{value: 0}, {value: 1}]);
    expect(numericAscending([{value: 1}, {value: 0}], 'value')).toEqual([{value: 0}, {value: 1}]);
    expect(numericAscending([{value: -1}, {value: 0}], 'value')).toEqual([{value: -1}, {value: 0}]);
    expect(numericAscending([{value: -1}, {value: undefined}], 'value')).toEqual([{value: -1}, {value: undefined}]);
    expect(numericAscending([{value: undefined}, {value: -1}], 'value')).toEqual([{value: undefined}, {value: -1}]);
    expect(numericAscending([{value: -1}, {value: Infinity}], 'value')).toEqual([{value: -1}, {value: Infinity}]);
    expect(numericAscending([{value: Infinity}, {value: -1}], 'value')).toEqual([{value: -1}, {value: Infinity}]);
    expect(numericAscending([{value: -1}, {value: Number.MAX_VALUE}], 'value')).toEqual([{value: -1}, {value: Number.MAX_VALUE}]);
    expect(numericAscending([{value: Number.MAX_VALUE}, {value: -1}], 'value')).toEqual([{value: -1}, {value: Number.MAX_VALUE}]);
    expect(numericAscending([{value: undefined}, {value: Number.MAX_VALUE}], 'value')).toEqual([{value: undefined}, {value: Number.MAX_VALUE}]);
    expect(numericAscending([{value: Number.MAX_VALUE}, {value: undefined}], 'value')).toEqual([{value: Number.MAX_VALUE}, {value: undefined}]);
    expect(numericAscending([{value: 0}, {value: 5}, {value: 3}, {value: 2}, {value: 4}, {value: 1}], 'value'))
      .toEqual([{value: 0}, {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}]);
    expect(numericAscending([{value: 0}, {value: -2}, {value: 1}, {value: 2}, {value: -1}, {value: 3}], 'value'))
      .toEqual([{value: -2}, {value: -1}, {value: 0}, {value: 1}, {value: 2}, {value: 3}]);
  });

  it('can sort descending numerically', function() {
    expect(numericDescending).toBeDefined();
    expect(numericDescending([])).toEqual([]);
    expect(numericDescending([0, 0])).toEqual([0, 0]);
    expect(numericDescending([1, 1])).toEqual([1, 1]);
    expect(numericDescending([-1, -1])).toEqual([-1, -1]);
    expect(numericDescending([1, -1])).toEqual([1, -1]);
    expect(numericDescending([0, 1])).toEqual([1, 0]);
    expect(numericDescending([1, 0])).toEqual([1, 0]);
    expect(numericDescending([-1, 0])).toEqual([0, -1]);
    expect(numericDescending([-1, undefined])).toEqual([-1, undefined]);
    expect(numericDescending([undefined, -1])).toEqual([-1, undefined]);
    expect(numericDescending([Infinity, -1])).toEqual([Infinity, -1]);
    expect(numericDescending([-1, Infinity])).toEqual([Infinity, -1]);
    expect(numericDescending([-1, Number.MAX_VALUE])).toEqual([Number.MAX_VALUE, -1]);
    expect(numericDescending([Number.MAX_VALUE, -1])).toEqual([Number.MAX_VALUE, -1]);
    expect(numericDescending([Infinity, Number.MAX_VALUE])).toEqual([Infinity, Number.MAX_VALUE]);
    expect(numericDescending([0, 5, 3, 2, 4, 1])).toEqual([5, 4, 3, 2, 1, 0]);
    expect(numericDescending([0, -2, 1, 2, -1, 3])).toEqual([3, 2, 1, 0, -1, -2]);
  });

  it('can sort descending numerically with a key', function() {
    expect(numericDescending).toBeDefined();
    expect(numericDescending([])).toEqual([]);
    expect(numericDescending([{value: 1}, {value: 1}], 'value')).toEqual([{value: 1}, {value: 1}]);
    expect(numericDescending([{value: -1}, {value: -1}], 'value')).toEqual([{value: -1}, {value: -1}]);
    expect(numericDescending([{value: 1}, {value: -1}], 'value')).toEqual([{value: 1}, {value: -1}]);
    expect(numericDescending([{value: 0}, {value: 1}], 'value')).toEqual([{value: 1}, {value: 0}]);
    expect(numericDescending([{value: 1}, {value: 0}], 'value')).toEqual([{value: 1}, {value: 0}]);
    expect(numericDescending([{value: -1}, {value: 0}], 'value')).toEqual([{value: 0}, {value: -1}]);
    expect(numericDescending([{value: -1}, {value: undefined}], 'value')).toEqual([{value: -1}, {value: undefined}]);
    expect(numericDescending([{value: undefined}, {value: -1}], 'value')).toEqual([{value: undefined}, {value: -1}]);
    expect(numericDescending([{value: -1}, {value: Infinity}], 'value')).toEqual([{value: Infinity}, {value: -1}]);
    expect(numericDescending([{value: Infinity}, {value: -1}], 'value')).toEqual([{value: Infinity}, {value: -1}]);
    expect(numericDescending([{value: -1}, {value: Number.MAX_VALUE}], 'value')).toEqual([{value: Number.MAX_VALUE}, {value: -1}]);
    expect(numericDescending([{value: Number.MAX_VALUE}, {value: -1}], 'value')).toEqual([{value: Number.MAX_VALUE}, {value: -1}]);
    expect(numericDescending([{value: undefined}, {value: Number.MAX_VALUE}], 'value')).toEqual([{value: undefined}, {value: Number.MAX_VALUE}]);
    expect(numericDescending([{value: Number.MAX_VALUE}, {value: undefined}], 'value')).toEqual([{value: Number.MAX_VALUE}, {value: undefined}]);
    expect(numericDescending([{value: 0}, {value: 5}, {value: 3}, {value: 2}, {value: 4}, {value: 1}], 'value'))
      .toEqual([{value: 5}, {value: 4}, {value: 3}, {value: 2}, {value: 1}, {value: 0}]);
    expect(numericDescending([{value: 0}, {value: -2}, {value: 1}, {value: 2}, {value: -1}, {value: 3}], 'value'))
      .toEqual([{value: 3}, {value: 2}, {value: 1}, {value: 0}, {value: -1}, {value: -2}]);
  });

});
