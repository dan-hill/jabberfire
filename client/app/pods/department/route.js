import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function () {
    this.send('changeLayout', 'app');
    this.render('department', {
      into: 'app',
      outlet: 'content'
    });
  }
});
