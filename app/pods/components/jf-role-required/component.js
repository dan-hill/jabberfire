import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  classNames: [''],
  roles_allowed: function(){
    return this.get('roles').split(' ');
  }.property('roles'),
  meetsRequirements: function() {
    var user_role = this.get('session.currentUser.role');
    var roles_allowed = this.get('roles_allowed');
    return roles_allowed.contains(user_role);
  }.property('session.currentUser.role', 'roles_allowed')
});
