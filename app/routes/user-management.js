import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('user');
  },
  setupController: function (controller, model)
  {
    controller.set('model',model);
    controller.set('userlist', model)
  },

  renderTemplate: function() {

    this.render('user-management', {
      into: 'admin'
    });
  }
});
