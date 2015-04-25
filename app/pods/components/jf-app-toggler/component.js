import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ['menu-toggler', 'responsive-toggler'],
  attributeBindings: ['data-toggle', 'data-target'],
  'data-toggle': function() {
    return this.get('data-toggle');
  }.property('data-toggle'),
  'data-target': function() {
    return this.get('data-target');
  }.property('data-target')
});
