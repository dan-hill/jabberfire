import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
    load();
  },
  show: function() {
    this.$('.modal').modal().on('hidden.bs.modal', function() {
      this.send('close');
    }.bind(this));
  }.on('didInsertElement')
});
