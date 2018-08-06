'use strict';

module.exports = {
  name: 'nypr-countdown',
  config() {
    return {
      moment: {
        includeTimezone: 'subset'
      }
    };
  }
};
