var moment = require('moment');

module.exports = {

  SECOND: moment.duration(1, 'second').asMilliseconds(),
  MINUTE: moment.duration(1, 'minute').asMilliseconds(),
  HOUR: moment.duration(1, 'hour').asMilliseconds(),
  TWELVE_HOURS: moment.duration(12, 'hours').asMilliseconds(),
  DAY: moment.duration(1, 'day').asMilliseconds(),
  FORTY_EIGHT_HOURS: moment.duration(2, 'days').asMilliseconds(),
  WEEK: moment.duration(7, 'days').asMilliseconds(),
  THIRTY_ONE_DAYS: moment.duration(31, 'days').asMilliseconds(),
  NINETY_DAYS: moment.duration(90, 'days').asMilliseconds(),
  HALF_YEAR: moment.duration(180, 'days').asMilliseconds(),
  YEAR: moment.duration(365, 'days').asMilliseconds(),
  DECADE: moment.duration(10, 'years').asMilliseconds()

};
