import Ember from 'ember';

export default Ember.Component.extend({
  closeText: 'Close',
  okText: 'Ok',
  actions: {
    save: function() {
      this.$('.modal').modal('hide');
      this.sendAction('didTouchUpOnSaveBulkChangeStatus');
    }
  },
  show: function() {
    this.$('.modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('close');
    }.bind(this));
  }.on('didInsertElement')
});
