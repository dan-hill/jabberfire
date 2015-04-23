import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('user.detail', {
      into: 'user'
    });
  },
  model: function (args) {
    return this.store.find('user', args.id);
  }
});
