import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(LoginControllerMixin, EmberValidations.Mixin, {
  authenticator: 'simple-auth-authenticator:jwt',
  validations: {
    identification: {
      presence: true
    },
    password: {
      presence: true
    }
  },
  actions:{
    authenticateForm: function(isValid){
      if(isValid){
        this.send('authenticate');
      }
    }
  },
  didFailAuthentication: function(){
    if(this.get('authentication-failed') === true){
      this.set('has-error', true);
    } else {
      this.set('has-error', false);
    }
  }.observes('authentication-failed')
});


