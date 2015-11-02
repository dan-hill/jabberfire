import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('manufacturer');
  },
  setupController: function (controller, model) {
    controller.set('model', model);
    controller.set('manufacturerlist', model);
  },
  renderTemplate: function () {
    this.render('manufacturers/list', {
      into: 'manufacturers'
    });
  }
});
