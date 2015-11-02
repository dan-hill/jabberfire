import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'i',
  classNames: [''],
  classNameBindings: ['icon-style'],
  'icon-style': function() {
    return 'icon-' + this.get('icon');
  }.property('icon')
});
