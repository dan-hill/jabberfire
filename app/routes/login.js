import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';
export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  renderTemplate: function() {
    this.render({'login': {
      into: 'auth-content'
    }});
  }
});
