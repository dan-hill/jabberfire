import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function () {
    this.send('changeLayout', 'app');
    this.render('loading', {
      into: 'app',
      outlet: 'content'
    });
  },
  activate: function(){
    NProgress.start();
  },
  deactivate: function() {
    NProgress.done();
  }
});
