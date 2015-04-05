import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params, transition) {
    return this.get('store').find('user', params.id);
  },

  serialize: function(model) {
    return { id: model.get('id')}
  },
  renderTemplate: function () {
    this.render('users/profile', {
      into: 'users'
    });
  }
});
