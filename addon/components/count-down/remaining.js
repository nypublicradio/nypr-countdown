import Component from '@ember/component';
import layout from '../../templates/components/count-down/remaining';
import { computed } from '@ember/object';

import moment from 'moment';

export default Component.extend({
  layout,
  tagName: '',

  asCalendar: computed('from', 'to', function() {
    let { from, to } = this;
    from = moment(from);
    to = moment(to);

    return to.calendar(from, {
      nextDay: () => '[tomorrow]',
      sameDay: () => `[today at ${to.format('LT')}]`,
      sameElse(from) {
        let duration = moment.duration(to.diff(from));
        let days = duration.as('days');
        let months = duration.as('months');
        let weeks = duration.as('weeks');
        let unit, value;
        if (days < 365 && days > 364 || days === 365) {
          unit = 'year';
          value = 1;
        } else if (months < 6 && months > 5 || months === 6) {
          unit = 'months';
          value = 6;
        } else if (weeks < 8 && weeks > 7 || weeks === 8) {
          unit = 'weeks';
          value = 8;
        } else {
          unit = 'days';
          value = duration.as('days');
        }
        return `[in ${value} ${unit}]`;
      }
    });
  })
});
