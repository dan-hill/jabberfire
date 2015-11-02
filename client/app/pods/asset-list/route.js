import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{

  model: function () {
    return this.store.find('asset');
  },
  setupController: function (controller, model) {
    controller.set('assets', model);
    controller.set('pageSize', '15');
    controller.set('selectedPage', 1);
    controller.set('pageSizes', [
      {name: "15", value: '15'},
      {name: "25", value: '25'},
      {name: "50", value: '50'},
      {name: "100", value: '100'}]);
    controller.set('selectedSort', 'title');
    controller.set('selectedSortDirection', 'ascending');
    controller.set('table_filter', '');
    controller.set('current_filter', 'name');
    controller.set('filterables', [
      {name: "Name", value: 'name'}]);

  },
  renderTemplate: function () {
    this.render('asset-list', {
      into: 'app',
      outlet: 'content'
    });
  }
});
