import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import moment from 'moment';

const TIMEZONE = 'America/New_York';

module('Integration | Component | count-down', function(hooks) {
  setupRenderingTest(hooks);

  test('usage', async function(assert) {
    const ONE_YEAR_FROM_NOW = moment().tz(TIMEZONE).add(1, 'year').set({hour: 6, minute: 0, second: 0}); // 6 am on whatever day it is 1 year from now
    this.set('to', ONE_YEAR_FROM_NOW);
    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(397, 'day'))

    await render(hbs`{{count-down from=from to=to unit='days'}}`);
    assert.dom('.count-down').hasText('is in 397 days');

    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(1, 'year'));
    await render(hbs`{{count-down from=from to=to unit='years'}}`);
    assert.dom('.count-down').hasText('is in 1 year');

    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(364, 'days'));
    await render(hbs`{{count-down from=from to=to unit='days'}}`);
    assert.dom('.count-down').hasText('is in 364 days');

    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(1, 'day'));
    assert.dom('.count-down').hasText('is tomorrow');

    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(3, 'hours'));
    assert.dom('.count-down').hasText('is today at 6:00 AM');

    this.set('from', undefined); // default to now()
    await render(hbs`{{count-down from=from to=to unit='years'}}`);
    assert.dom('.count-down').hasText('is in 1 year', 'defaults to now');

  });

  test('block usage', async function(assert) {
    const ONE_YEAR_FROM_NOW = moment().tz(TIMEZONE).add(1, 'year').set({hour: 6, minute: 0, second: 0}); // 6 am on whatever day it is 1 year from now
    this.set('to', ONE_YEAR_FROM_NOW);

    await render(hbs`
      {{#count-down to=to unit='days' as |count|}}
        {{count}}
      {{/count-down}}
    `);

    assert.dom('.count-down').hasText('365', 'renders raw value');

    await render(hbs`
      {{#count-down to=to unit='days' as |count|}}
        {{#if (lte count 365)}}
          less than a year
        {{else}}
          {{count}}
        {{/if}}
      {{/count-down}}
    `);
    assert.dom('.count-down').hasText('less than a year', 'can evaluate yielded count in template');
  });
});
