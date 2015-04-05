import Ember from 'ember';
import RolesRequiredMixinMixin from '../../../mixins/roles-required-mixin';
import { module, test } from 'qunit';

module('RolesRequiredMixinMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var RolesRequiredMixinObject = Ember.Object.extend(RolesRequiredMixinMixin);
  var subject = RolesRequiredMixinObject.create();
  assert.ok(subject);
});
