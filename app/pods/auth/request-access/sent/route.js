import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('auth.request-access.sent', {
      into: 'auth.request-access',
      outlet: 'sent'
    });
  },
});
