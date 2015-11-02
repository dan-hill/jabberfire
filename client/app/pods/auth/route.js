import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  renderTemplate: function(controller,model) {
    this.send('changeLayout', 'auth');
  },
  actions: {
    sessionAuthenticationSucceeded: function() {
      var controller = this.controllerFor('application');
      controller.transitionToRoute('dashboard');
    },
    sessionAuthenticationFailed: function() {
      var controller = this.controllerFor('auth.login');
      controller.set('authentication-failed', true);
    }
  }
});
