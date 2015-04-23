import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  renderTemplate: function() {
    this.render('auth.login', {
      into: 'auth'
    });
  },
  setupController: function (controller, model) {
    controller.set('model', model);
    controller.set('assetlist', model);
  }
});
