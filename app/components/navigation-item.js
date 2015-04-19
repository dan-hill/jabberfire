import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['start'],
  actions: {

  },
  rolesMet: false,
  willInsertElement: function() {
    Ember.run.schedule('afterRender',this, function(){
      var roles_required = this.get('roles-required').split(' ');
      var current_user_roles = this.get('session.currentUser.roles');

      var self = this;
      roles_required.forEach(function(req){
        current_user_roles.forEach(function(id) {
          self.store.find('role', id).then(function(role){
            if(role.get('name') === req){
              return self.set('rolesMet', true);
            }
          });
        });
      });
    });

  }
});
