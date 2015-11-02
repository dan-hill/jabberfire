import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['form-group', 'form-md-line-input', 'form-md-floating-label'],
  classNameBindings: ['status-color'],
  'status-color': function() {
    return 'has-' + this.get('color');
  }.property('color')
});
