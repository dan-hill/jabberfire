import Ember from 'ember';

export default Ember.Controller.extend({
  selectedStatus: 'pending',
  statuses: [
    {value: 'pending',   name: 'Pending'},
    {value: 'active',    name: 'Active'},
    {value: 'inactive',  name: 'Inactive'}
  ],
  needs: ['users'],
  actions: {
    save: function() {
      $('.modal').modal('hide');
      this.get('controllers.users').send('didTouchUpOnSaveBulkChangeStatus', this.get('selectedStatus'));
      this.send('removeModal')
    },
    close: function(){
      $('.modal').modal('hide');
      this.send('removeModal')
    }
  }
});
