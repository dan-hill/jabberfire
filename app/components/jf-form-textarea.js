import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['bootstrap-columns'],
  'bootstrap-columns': function() {
    return 'col-md-' + this.get('columns');
  }.property('columns')
});
