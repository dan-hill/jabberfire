import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'label',
  classNames: ['control-label visible-ie8 visible-ie9'],
  classNameBindings: ['columns'],
  'columns': function() {
    return 'col-md-' + this.get('width');
  }.property('width')
});
