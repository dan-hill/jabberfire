import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function () {
    this.send('changeLayout', 'app');
    this.render('asset', {
      into: 'app',
      outlet: 'content'
    });
  }
});
