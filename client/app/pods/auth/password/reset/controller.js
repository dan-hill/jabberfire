import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from '../../config/environment.js'

export default Ember.Controller.extend(EmberValidations.Mixin, {
  validations: {
    password: {
      confirmation: true,
      presence: true,
      length: { minimum: 8 }
    },
    passwordConfirmation: {
      presence: true
    }
  },
  actions: {
    didTouchUpOnReset: function(){
      var self = this;

      this.validate().then(function(){
        $.ajax({
          type: 'POST',
          url: ENV.APP.host,
          data:  JSON.stringify({
            token: this.get('model'),
            password: this.get('password')
          }),
          success: function(data) {console.log('sent post')},
          contentType: "application/json",
          dataType: 'json'
        });
      }).catch(function(){
        self.set('has-error', true);
      })
    }
  },
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
      set_status('passwordConfirmation', $('#passwordConfirmation'));
      set_status('password', $('#password'));
    }).catch(function() {
        set_status('passwordConfirmation', $('#passwordConfirmation'));
        set_status('password', $('#password'));
      }
    )
  }.observes('password', 'passwordConfirmation')
});
