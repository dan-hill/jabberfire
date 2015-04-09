import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('asset');
  },
  setupController: function (controller, model) {
    controller.set('model', model);
    controller.set('assetlist', model);
  },
  renderTemplate: function () {
    this.render('assets/list', {
      into: 'assets'
    });
  }
});
