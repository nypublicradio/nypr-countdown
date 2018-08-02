import Component from '@ember/component';
import layout from '../templates/components/count-down';
import { computed } from '@ember/object';

import { singularize, pluralize } from 'ember-inflector';

import moment from 'moment';

export default Component.extend({
  classNames: ['count-down'],
  tagName: 'span',
  layout,

  from: moment(),

  humanizedTime: computed('from', 'to', 'unit', function() {
    if (!this.to) {
      return;
    }
    let { from, to, unit } = this;
    from = moment(from);
    to = moment(to);

    return to.calendar(from, {
      sameDay: () => `[is today at ${to.format('LT')}]`,
      nextDay: () => '[is tomorrow]',
      nextWeek: () => `[is ${to.format('dddd')}]`,
      lastDay: () => '[was yesterday]',
      lastWeek: () => `[was ${to.format('dddd')}]`,
      sameElse(from) {
        let value = moment.duration(to.diff(from)).as(unit);
        value = Math.round(value);
        if (value === 1) {
          unit = singularize(unit);
        } else {
          unit = pluralize(unit);
        }
        if (from.isBefore(to)) {
          return `[is in ${value} ${unit}]`;
        } else {
          return `[was ${value} ${unit} ago]`;
        }
      }
    });
  })
});
