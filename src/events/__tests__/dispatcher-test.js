var Dispatcher = require('../dispatcher');

describe('Dispatcher', function() {

  it('has dispatch functions corresponding to the Events module', function() {
    expect(Dispatcher.datahover).toBeDefined();
    expect(Dispatcher.mousemove).toBeDefined();
    expect(Dispatcher.mouseout).toBeDefined();
  });

});
