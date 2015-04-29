import Ember from 'ember';

export default Ember.Component.extend({
  requiredRoles: Ember.A([]),
  meetsRequirements: function() {
    var user_role = this.get('session.currentUser.Role');
    var required_role = this.get('requiredRole');


  }

});
