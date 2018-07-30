import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ember-ticker/remaining', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{ember-ticker/remaining}}`);

    assert.equal(this.element.textContent.trim(), 'a few seconds');

    // Template block usage:
    await render(hbs`
      {{#ember-ticker/remaining}}
        template block text
      {{/ember-ticker/remaining}}
    `);

    assert.equal(this.element.textContent.trim(), 'a few seconds');
  });
});
