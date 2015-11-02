import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['dropdown', 'dropdown-extended', 'dropdown-notification'],
  attributeBindings: ['elementID:id'],
  elementID: "header_notification_bar"
});
