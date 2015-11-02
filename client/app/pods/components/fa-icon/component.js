import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'i',
  classNames: ['fa'],
  classNameBindings: ['icon-style'],
  'icon-style': function() {
    return 'fa-' + this.get('icon');
  }.property('icon')
});
