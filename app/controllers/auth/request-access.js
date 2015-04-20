import Ember from 'ember';
import EmberValidations from 'ember-validations';


export default Ember.Controller.extend(EmberValidations.Mixin, {
  'logo-large': 'img/ccmh/logo_large.png',

  authenticator: 'simple-auth-authenticator:jwt',

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
      presence: true
    },
    passwordConfirmation: {
      presence: true
    }
  },

  actions:{
    'send-request': function () {
      var self = this;
      this.validate()
        .then(function(){
          var user = self.store.createRecord('access-request', {
            firstname: self.get('firstname'),
            lastname: self.get('lastname'),
            email: self.get('email'),
            username: self.get('username'),
            password: self.get('password'),
            employee_id: self.get('employee-id')
          });

          user.save()
            .then(function() {
              self.transitionToRoute('auth.request-sent');
            })
            .catch(function() {
              console.log('save failed');
            });

        })
        .catch(function(){
          console.log('form was not valid.')
        })
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

    this.validate()
      .then(function() {
        self.set('status-lastname', 'success');
        self.set('status-firstname', 'success');
        self.set('status-email', 'success');
        self.set('status-password', 'success');
        self.set('status-passwordConfirmation', 'success');
      })
      .catch(function() {

        if(self.get('errors.lastname') !== undefined && self.get('errors.lastname').length !== 0){
          self.set('status-lastname', 'error');
        } else {
          self.set('status-lastname', 'success');
        }

        if(self.get('errors.firstname') !== undefined && self.get('errors.firstname').length !== 0){
          self.set('status-firstname', 'error');
        } else {
          self.set('status-firstname', 'success');
        }

        if(self.get('errors.email') !== undefined && self.get('errors.email').length !== 0){
          self.set('status-email', 'error');
        } else {
          self.set('status-email', 'success');
        }

        if(self.get('errors.password') !== undefined && self.get('errors.password').length !== 0){
          self.set('status-password', 'error');
        } else {
          self.set('status-password', 'success');
        }
        if(self.get('errors.passwordConfirmation') !== undefined && self.get('errors.passwordConfirmation').length !== 0){
          self.set('status-passwordConfirmation', 'error');
        } else {
          self.set('status-passwordConfirmation', 'success');
        }
      })



  }.observes('firstname', 'lastname', 'email', 'password', 'passwordConfirmation', 'employee-id')
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
});
