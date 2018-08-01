import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import moment from 'moment';

module('Integration | Component | count-down', function(hooks) {
  setupRenderingTest(hooks);

  test('inline usage', async function(assert) {
    const ONE_YEAR_FROM_NOW = moment().add(1, 'year').set({hour: 6, minute: 0, second: 0}); // 6 am on whatever day it is 1 year from now
    this.set('to', ONE_YEAR_FROM_NOW);
    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(397, 'day'))

    await render(hbs`{{count-down from=from to=to}}`);
    assert.dom('.count-down').hasText('in 397 days');

    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(1, 'year'));
    assert.dom('.count-down').hasText('in 1 year');

    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(364, 'days'));
    assert.dom('.count-down').hasText('in 364 days');

    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(1, 'day'));
    assert.dom('.count-down').hasText('tomorrow');

    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(3, 'hours'));
    assert.dom('.count-down').hasText('today at 6:00 AM');

    this.set('from', null); // default to now()
    assert.dom('.count-down').hasText('in 1 year', 'defaults to now');

  });

  test('block usage', async function(assert) {
    const ONE_YEAR_FROM_NOW = moment().add(1, 'year').hour(6); // 6 am on whatever day it is 1 year from now
    const START = ONE_YEAR_FROM_NOW.clone().subtract(397, 'day');
    const DURATION = moment.duration(ONE_YEAR_FROM_NOW.diff(START));

    this.set('to', ONE_YEAR_FROM_NOW);
    this.set('from', START)

    await render(hbs`
      {{#count-down from=from to=to as |counter|}}
        {{counter.remaining}}
      {{/count-down}}
    `);

    assert.dom('.count-down').hasText('a year'); // humanized

    await render(hbs`
      {{#count-down from=from to=to as |counter|}}
        {{counter.remaining unit='days'}}
      {{/count-down}}
    `);

    assert.dom('.count-down').hasText('397');

    await render(hbs`
      {{#count-down from=from to=to as |counter|}}
        {{counter.remaining unit='hours'}}:{{counter.remaining unit='seconds'}}
      {{/count-down}}
    `);

    assert.dom('.count-down').hasText(`${DURATION.as('hours')}:${DURATION.as('seconds')}`);

  });
});
