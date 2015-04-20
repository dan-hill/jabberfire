import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['start'],
  actions: {

  },
  rolesMet: false,
  willInsertElement: function() {

  },
  checkRoles: function() {
    var self = this;
    if(self.get('session.currentUser.firstname') !== undefined){
      var user_roles = self.get('session.currentUser.roles');
      var required_roles = self.get('roles-required').split(' ');

      if(required_roles.filter(function(req){
          user_roles.some(function(role, index, self){
            return req === role.name;
          })
        }) !== 0){
        this.set('rolesMet', true);
      }
    }
  }.observes('session.currentUser.roles')
});
