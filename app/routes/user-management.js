import Ember from 'ember';

export default Ember.Route.extend({
  rolesRequired: [3],
  beforeModel: function (transition) {
    var userroles = [];
    var required = this.get('rolesRequired');

    try {
      // Ain't no body got time for this
      this.get('session.currentUser.roles').forEach(function (role) {
        if (role % 1 === 0) {
          userroles.push(parseInt(role));
        } else {
          userroles.push(parseInt(role.id));
        }

      });


      required.forEach(function (req) {
        if (Ember.$.inArray(req, userroles) == -1) {
          transition.abort();
        }
      });
    } catch(e) {
      this.transitionTo('auth.login');
    }

  },
  model: function () {
    return this.store.find('user');
  },
  setupController: function (controller, model) {
    controller.set('model', model);
    controller.set('userlist', model)
  },
  renderTemplate: function () {

    this.render('user-management', {
      into: 'admin'
    });
  }
});
