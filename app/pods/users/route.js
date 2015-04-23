import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  beforeModel: function (transition) {

  },
  model: function () {
    return this.store.find('user');
  },
  setupController: function (controller, model) {
    controller.set('model', model);
  },
  renderTemplate: function () {
    this.send('changeLayout', 'app');
    this.render('users', {
      into: 'app',
      outlet: 'content'
    });
  }
});

