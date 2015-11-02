import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  renderTemplate: function(controller,model) {
    this.send('changeLayout', 'app');
    this._super(controller, model);

    this.render('dashboard', {
      into: 'app',
      outlet: 'content'
    });
  }
});
