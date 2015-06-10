var Duration = require('../duration');

describe('Duration...', function() {

  it('enumerates the number of milliseconds in a second', function() {
    expect(Duration.SECOND).toEqual(1000);
  });

  it('enumerates the number of milliseconds in a minute', function() {
    expect(Duration.MINUTE).toEqual(60000);
  });

  it('enumerates the number of milliseconds in an hour', function() {
    expect(Duration.HOUR).toEqual(3600000);
  });

  it('enumerates the number of milliseconds in twelve hours', function() {
    expect(Duration.TWELVE_HOURS).toEqual(43200000);
  });

  it('enumerates the number of milliseconds in a day', function() {
    expect(Duration.DAY).toEqual(86400000);
  });

  it('enumerates the number of milliseconds in 48 hours', function() {
    expect(Duration.FORTY_EIGHT_HOURS).toEqual(172800000);
  });

  it('enumerates the number of milliseconds in a week', function() {
    expect(Duration.WEEK).toEqual(604800000);
  });

  it('enumerates the number of milliseconds in 31 days', function() {
    expect(Duration.THIRTY_ONE_DAYS).toEqual(2678400000);
  });

  it('enumerates the number of milliseconds in 90 days', function() {
    expect(Duration.NINETY_DAYS).toEqual(7776000000);
  });

  it('enumerates the number of milliseconds in 180 days', function() {
    expect(Duration.HALF_YEAR).toEqual(15552000000);
  });

  it('enumerates the number of milliseconds in a year', function() {
    expect(Duration.YEAR).toEqual(31536000000);
  });

  it('enumerates the number of milliseconds in a decade', function() {
    expect(Duration.DECADE).toEqual(315532800000);
  });

  it('enumerates the number of milliseconds in a century', function() {
    expect(Duration.CENTURY).toEqual(3155673600000);
  });

});
