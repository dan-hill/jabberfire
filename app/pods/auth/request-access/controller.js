import Ember from 'ember';
import EmberValidations from 'ember-validations';


export default Ember.Controller.extend(EmberValidations.Mixin, {
  'logo-large': 'img/ccmh/logo_large.png',
  authenticator: 'simple-auth-authenticator:jwt',
  willInsertElement: function(){
    this.set('has-error', false);
  },
  validations: {
    firstname: {
      presence: true
    },
    lastname: {
      presence: true
    },
    email: {
      format: /.+@.+\..{2,4}/
    },
    password: {
      confirmation: true,
      presence: true,
      length: { minimum: 8 }
    },
    passwordConfirmation: {
      presence: true
    }
  },

  actions:{
    didTouchUpOnSend: function() {
      var self = this;

      this.validate().then(function () {
        var user = self.store.createRecord('access-request', {
          firstname: self.get('firstname'),
          lastname: self.get('lastname'),
          email: self.get('email'),
          password: self.get('password'),
          employee_id: self.get('employee_id')
        });

        user.save()
          .then(function() {
            self.set('sent-request', true);
          })
          .catch(function(response) {
            self.set('send-failed', true);
          });
      }).catch(function () {
        self.set('validation-failed', true);
      });
    },

    authenticateForm: function(isValid){
      console.log(isValid);
      if(isValid){
        this.send('authenticate');
      }
    },
    'open-terms-of-service': function() {
      this.send('openModal', 'auth/terms-of-service');
    },
    'open-privacy-policy': function() {
      this.send('openModal', 'auth/privacy-policy');
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

<<<<<<< HEAD
        if(self.get('errors.passwordConfirmation') !== undefined && self.get('errors.passwordConfirmation').length !== 0){
          self.set('status-passwordConfirmation', 'error');
        } else {
          self.set('status-passwordConfirmation', 'success');
        }
      })
  }.observes('firstname', 'lastname', 'email', 'password', 'passwordConfirmation', 'employee-id')
<<<<<<< HEAD
<<<<<<< HEAD
=======
    this.validate().then(function() {

      console.log( self.get('isValid') ? 'isValid' : 'isNotValid') ; // true
      console.log(self.get('errors'));
    }).catch(function() {
      // any validations fail
      console.log( self.get('isValid') ? 'isValid' : 'isNotValid') ; // false
      console.log(self.get('errors'));
    }).finally(function() {
      // all validations complete
      // regardless of isValid state
      console.log( self.get('isValid') ? 'isValid' : 'isNotValid') ;// true || false
      console.log(self.get('errors'));
    });


  }.observes('firstname', 'lastname')
>>>>>>> af95f12... Fix missing semicolons
=======

>>>>>>> e5255fa... Change livereload port
=======
>>>>>>> 558a886... Fix loading routes. Change loading indicator to nprogress.
=======
    this.validate().then(function() {
      set_status('firstname', $('#firstname'));
      set_status('lastname', $('#lastname'));
      set_status('email', $('#email'));
      set_status('passwordConfirmation', $('#passwordConfirmation'));
      set_status('password', $('#password'));
      set_status('employee_id', $('#employee-id'));
    }).catch(function() {
        set_status('firstname', $('#firstname'));
        set_status('lastname', $('#lastname'));
        set_status('email', $('#email'));
        set_status('passwordConfirmation', $('#passwordConfirmation'));
        set_status('password', $('#password'));
        set_status('employee_id', $('#employee-id'));
      }
    )
  }.observes('firstname', 'lastname', 'email', 'password', 'passwordConfirmation')
>>>>>>> cb2d658... Prepared to merge into development
});
