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
    didTouchUpOnLogin: function() {
      var self = this;

      this.validate().then(function () {
        self.send('authenticate');
      }).catch(function () {
        self.set('validation-failed', true);
      });
    }
  },

  didFailAuthentication: function(){
    if(this.get('authentication-failed') === true){
      this.set('has-error', true);
    } else {
      this.set('has-error', false);
    }
  }.observes('authentication-failed'),
  validateInput: function(){
    var self = this;

    var set_status = function(item, selector){
      if(self.get('errors.' + item ) !== undefined && self.get('errors.' + item).length !== 0) {
        selector.removeClass('has-default');
        selector.addClass('has-error');

      } else {
        selector.removeClass('has-error');
        selector.addClass('has-default');
      }
    };

    this.validate().then(function() {
      set_status('identification', $('#identification'));
      set_status('password', $('#password'));
    }).catch(function() {
        set_status('identification', $('#identification'));
        set_status('password', $('#password'));
      }
    )
  }.observes('identification', 'password')
});


