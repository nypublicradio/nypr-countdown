import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import moment from 'moment';

module('Integration | Component | ember-ticker', function(hooks) {
  setupRenderingTest(hooks);

  test('inline usage', async function(assert) {
    const ONE_YEAR_FROM_NOW = moment().add(1, 'year').set({hour: 6, minute: 0, second: 0}); // 6 am on whatever day it is 1 year from now
    this.set('to', ONE_YEAR_FROM_NOW);
    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(397, 'day'))

    await render(hbs`{{ember-ticker from=from to=to}}`);
    assert.dom('.ember-ticker').hasText('in 397 days');

    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(1, 'year'));
    assert.dom('.ember-ticker').hasText('in 1 year');

    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(364, 'days'));
    assert.dom('.ember-ticker').hasText('in 364 days');

    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(1, 'day'));
    assert.dom('.ember-ticker').hasText('tomorrow');

    this.set('from', ONE_YEAR_FROM_NOW.clone().subtract(3, 'hours'));
    assert.dom('.ember-ticker').hasText('today at 6:00 AM');

    this.set('from', null); // default to now()
    assert.dom('.ember-ticker').hasText('in 1 year', 'defaults to now');

  });

  test('block usage', async function(assert) {
    const ONE_YEAR_FROM_NOW = moment().add(1, 'year').hour(6); // 6 am on whatever day it is 1 year from now
    const START = ONE_YEAR_FROM_NOW.clone().subtract(397, 'day');
    const DURATION = moment.duration(ONE_YEAR_FROM_NOW.diff(START));

    this.set('to', ONE_YEAR_FROM_NOW);
    this.set('from', START)

    await render(hbs`
      {{#ember-ticker from=from to=to as |ticker|}}
        {{ticker.remaining}}
      {{/ember-ticker}}
    `);

    assert.dom('.ember-ticker').hasText('a year'); // humanized

    await render(hbs`
      {{#ember-ticker from=from to=to as |ticker|}}
        {{ticker.remaining unit='days'}}
      {{/ember-ticker}}
    `);

    assert.dom('.ember-ticker').hasText('397');

    await render(hbs`
      {{#ember-ticker from=from to=to thresholds=threshold as |ticker|}}
        {{ticker.remaining unit='hours'}}:{{ticker.remaining unit='seconds'}}
      {{/ember-ticker}}
    `);

    assert.dom('.ember-ticker').hasText(`${DURATION.as('hours')}:${DURATION.as('seconds')}`);

  });
});
