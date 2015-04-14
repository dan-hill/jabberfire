import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNameBindings: ['columns'],
  'columns': function() {
    return 'col-md-' + this.get('width');
  }.property('width')
});
