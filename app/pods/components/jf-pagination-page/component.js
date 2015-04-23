import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['page-number'],
  'page-number': function() {
    return 'page-' + this.get('page');
  }.property('page'),
  click: function() {
    this.sendAction('action', this.get('page'));
  }
});
