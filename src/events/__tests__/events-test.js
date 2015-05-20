var Events = require('../events');

describe('Events', function() {

  it('has string constants that describe event types', function() {
    expect(Events.DATA_HOVER).toEqual('datahover');
    expect(Events.MOUSE_MOVE).toEqual('mousemove');
    expect(Events.MOUSE_OUT).toEqual('mouseout');
  });

  it('returns namespaced event types', function() {
    expect(Events.getNamespaced()).toEqual('');
    expect(Events.getNamespaced('')).toEqual('');
    expect(Events.getNamespaced('')).toEqual('');
    expect(Events.getNamespaced(Events.DATA_HOVER)).toEqual('datahover');
    expect(Events.getNamespaced(Events.DATA_HOVER, 'foo')).toEqual('datahover.foo');
    expect(Events.getNamespaced('', 'foo')).toEqual('');
  });

});
