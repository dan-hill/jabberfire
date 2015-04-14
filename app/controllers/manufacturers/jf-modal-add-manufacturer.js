import Ember from 'ember';

export default Ember.Controller.extend({
  validations: {
    title: {
      presence: true
    }
  },
  actions: {
    save: function() {
      var user = this.store.createRecord('manufacturer', {
        title: this.get('title'),
        description: this.get('description'),
        note: this.get('note')
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
