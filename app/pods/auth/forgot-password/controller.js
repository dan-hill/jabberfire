import Ember from 'ember';
import EmberValidations from 'ember-validations';


export default Ember.Controller.extend(EmberValidations.Mixin, {
  'logo-large': 'img/ccmh/logo_large.png',

  authenticator: 'simple-auth-authenticator:jwt',
  validations: {
    email: {
      presence: true,
      format: /.+@.+\..{2,4}/
    }
  },
  actions:{
    authenticateForm: function(isValid){
      console.log(isValid);
      if(isValid){
        this.send('authenticate');
      }
    }
  },
  validateInput: function(){
    var self = this;
    this.validate().then(function() {

      console.log( self.get('isValid') ? 'isValid' : 'isNotValid'); // true
      console.log(self.get('errors'));
    }).catch(function() {
      // any validations fail
      console.log( self.get('isValid') ? 'isValid' : 'isNotValid');  // false
      console.log(self.get('errors'));
    }).finally(function() {
      // all validations complete
      // regardless of isValid state
      console.log( self.get('isValid') ? 'isValid' : 'isNotValid'); // true || false
      console.log(self.get('errors'));
    });


  }.observes('email')
});
