import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

  actions: {
    sessionAuthenticationSucceeded: function() {
      var controller = this.controllerFor('application');
      controller.transitionToRoute('app.dashboard');
    },
    openModal: function(modalName) {

      this.render('modal', {
        into: 'application',
        outlet: 'modal'
      });
      this.render(modalName, {
        into: 'modal',
        outlet: 'modal-content'
      });

    },
    closeModal: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }

  }
});
