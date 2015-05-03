import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{

  model: function () {
    return this.store.find('manufacturer');
  },
  setupController: function (controller, model) {
    controller.set('manufacturers', model);
  },
  renderTemplate: function () {
    this.render('manufacturers', {
      into: 'app',
      outlet: 'content'
    });
  }
});
