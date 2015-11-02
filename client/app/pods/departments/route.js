import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{

  model: function () {
    return this.store.find('department');
  },
  setupController: function (controller, model) {
    controller.set('model', model);
    console.log(model)
  },
  renderTemplate: function () {
    this.render('departments', {
      into: 'app',
      outlet: 'content'
    });
  }
});
