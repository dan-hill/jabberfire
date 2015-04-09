import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'i',
  classNames: [''],
  classNameBindings: ['icon-style', 'color-style'],
  'icon-style': function() {
    return 'icon-' + this.get('icon');
  }.property('icon'),
  'color-style': function() {
    return 'font-' + this.get('color');
  }.property('color')
});
