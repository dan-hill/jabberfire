import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['dropdown', 'dropdown-extended', 'dropdown-inbox'],
  attributeBindings: ['elementID:id'],
  elementID: "header_inbox_bar"
});

