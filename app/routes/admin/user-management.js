import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return ['yellow','red', 'yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow', 'blue'];
  },
  renderTemplate: function() {

    this.render('user-management', {
      into: 'admin'
    });
  }
});
