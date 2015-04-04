import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin,{
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
  roles: [
    {title: 'Administrator', id: 3},
    {title: 'Technician', id: 2},
    {title: 'User', id: 1}
  ],
  currentRole: {title: 'Administrator', id: 3},
  selectedRole: null,
  actions: {
    save: function() {
      var user = this.store.createRecord('user', {
        firstname: this.get('firstname'),
        lastname: this.get('lastname'),
        'email': this.get('email'),
        'username': this.get('username'),
        'employee_id': this.get('employeeID'),
        'status': this.get('status')
      });
      var self = this;
      this.store.find('role', this.get('currentRole.id')).then(function(role){
          user.get('roles').addObject(role);
      });

      var onSuccess = function(user){
        self.send('closeModal');
      };

      var onFail = function(user){
        console.log('failed to add user')
      };

      user.save(onSuccess, onFail);


    },
    close: function(){
      this.send('closeModal');
    }
  }
});
