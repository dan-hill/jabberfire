import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['users'],
  selectedRole: 1,
  roles: [
    {id: 1, name: 'User'},
    {id: 2, name: 'Technician'},
    {id: 3, name: 'Administrator'}
  ],
  actions: {
    save: function() {
      $('.modal').modal('hide');
      this.get('controllers.users').send('didTouchUpOnSaveBulkChangeRole');
      this.send('removeModal')
    },
    close: function(){
      $('.modal').modal('hide');
      this.send('removeModal')
    }
  }
});
