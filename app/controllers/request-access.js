import Ember from 'ember';
import EmberValidations from 'ember-validations';


export default Ember.Controller.extend(EmberValidations.Mixin, {
  authenticator: 'simple-auth-authenticator:jwt',
  validations: {
    firstname: {
      presence: true
    },
    lastname: {
      presence: true
    },
    employeeID: {
    },
    email: {
      presence: true,
      format: /.+@.+\..{2,4}/
    },
    password: {
      confirmation: true,
      presence: {
        message: ' password required'
      }
    },

    passwordConfirmation: {
      presence: {
        message: ' please confirm password'
      }
    }
  },
  actions:{
    authenticateForm: function(isValid){
      console.log(isValid);
      if(isValid){
        this.send('authenticate');
      }
    }
  }
});
