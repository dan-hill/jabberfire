import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['badge'],
  classNameBindings: ['badge-style'],
  'badge-style': function() {
    return 'badge-' + this.get('badge');
  }.property('badge')
});
