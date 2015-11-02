import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('unit.detail', {
      into: 'unit'
    });
  },
  model: function (args) {

    return this.store.find('unit', args.id)
  },
  setupController: function (controller, model) {
    controller.set('unit', model);

  }
});
