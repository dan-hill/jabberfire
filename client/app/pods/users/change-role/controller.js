import Ember from 'ember';

export default Ember.Controller.extend({
  selectedRole: 'user',
  roles: [
    {value: 'user',           name: 'user'},
    {value: 'technician',     name: 'technician'},
    {value: 'administrator',  name: 'administrator'}
  ],
  needs: ['users'],
  actions: {
    save: function() {
      $('.modal').modal('hide');
      this.get('controllers.users').send('didTouchUpOnSaveBulkChangeRole', this.get('selectedRole'));
      this.send('removeModal')
    },
    close: function(){
      $('.modal').modal('hide');
      this.send('removeModal')
    }
  }
});
