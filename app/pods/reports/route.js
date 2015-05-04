import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{

  model: function () {

  },
  setupController: function (controller, model) {

  },
  renderTemplate: function () {
    this.render('reports', {
      into: 'app',
      outlet: 'content'
    });
  },

});
