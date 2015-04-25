import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['dropdown-menu'],
  attributeBindings: ['role'],
  'role': 'menu',
});
