import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  renderTemplate: function() {
    this.send('changeLayout', 'auth');
    this.render('auth.password.reset', {
      into: 'auth'
    });
  },
  model: function(args){
    return args.password_token
  }
});

