import Ember from 'ember';

export default Ember.Controller.extend({
  selectedStatus: 'pending',
  statuses: [
    {id: 'pending',   name: 'Pending'},
    {id: 'active',    name: 'Active'},
    {id: 'inactive',  name: 'Inactive'}
  ],
  needs: ['users'],
  actions: {
    save: function() {
      $('.modal').modal('hide');
      this.get('controllers.users').send('didTouchUpOnSaveBulkChangeStatus');
    },
    close: function(){
      $('.modal').modal('hide');
      this.send('removeModal')
    }
  }
});
