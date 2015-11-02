import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('manufacturer', params.id);
  },
  setupController:function(controller, model){
    controller.set('model', model);
  },

  serialize: function(model) {
    return { id: model.get('id')};
  },
  renderTemplate: function () {
    this.render('manufacturers/detail', {
      into: 'manufacturers'
    });
  }
});
