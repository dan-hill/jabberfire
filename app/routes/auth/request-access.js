import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, user) {
    controller.set('model', user);
  },
  renderTemplate: function() {
    this.render('auth/request-access', {
      into: 'auth'
    });
  }
});
