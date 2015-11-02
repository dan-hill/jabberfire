import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ['dropdown-toggle'],
  attributeBindings: ['data-toggle', 'data-hover', 'data-close-others'],
  'data-toggle': function() {
    return 'dropdown';
  }.property('data-toggle'),
  'data-hover': function() {
    return 'dropdown';
  }.property('data-hover'),
  'data-close-others': function() {
    return 'true';
  }.property('data-close-others')
});
