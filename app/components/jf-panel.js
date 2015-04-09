import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['panel'],
  classNameBindings: ['panel-style'],
  'panel-style': function() {
    return 'panel-' + this.get('style');
  }.property('style')

});
