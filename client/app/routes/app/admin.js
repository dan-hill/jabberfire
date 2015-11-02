import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('admin', {
      into: 'app'
    });
  },
  model: function() {
    return this.store.find('user');
  }
});
