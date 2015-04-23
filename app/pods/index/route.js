import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    // This has to live here because using the beforeModel hook in the application route will
    // make simple auth application mixin not work. Everything WILL be bad.
    console.log('im in the index')
    var session = this.get('session');

    if(session.isAuthenticated){
      this.transitionTo('dashboard');
    } else {
      this.transitionTo('auth.login');
    }
  },
});

