import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    sessionAuthenticationSucceeded: function() {
      var controller = this.controllerFor('application');
      controller.transitionToRoute('dashboard');
    },
    sessionAuthenticationFailed: function() {
      var controller = this.controllerFor('auth.login');
      controller.set('authentication-failed', true);
      console.log('auth failed!!')
    },
    showModal: function(name, model) {
      this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model
      });
    },
    removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },
    changeLayout: function(templateName) {
      this.render(templateName, {
        into: 'application'
      });
    }
  }
});
