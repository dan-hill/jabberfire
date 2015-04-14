import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'label',
  classNames: ['control-label'],
  classNameBindings: ['columns'],
  'columns': function() {
    return 'col-md-' + this.get('width');
  }.property('width')
});
