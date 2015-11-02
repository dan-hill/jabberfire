import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{

  model: function () {
    return this.store.find('user');
  },
  setupController: function (controller, model) {

    controller.set('users', _.filter(model.toArray(), function(user){return user.get('user_id') !== undefined}));

    controller.set('pageSize', '15');
    controller.set('selectedPage', 1);
    controller.set('pageSizes', [
      {name: "15", value: '15'},
      {name: "25", value: '25'},
      {name: "50", value: '50'},
      {name: "100", value: '100'}]);
    controller.set('sortValue', 'firstname');
    controller.set('sortOrder', true);
    controller.set('table_filter', '');
    controller.set('current_filter', 'firstname');
    controller.set('filterables', [
      {name: "Name", value: 'firstname'}]);

  },
  renderTemplate: function () {
    this.render('users', {
      into: 'app',
      outlet: 'content'
    });
  },

});

