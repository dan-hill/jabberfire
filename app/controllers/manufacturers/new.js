import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    'cancel': function() {
      this.transitionToRoute('manufacturers.list')
    },
    'save': function() {
      var manufacturer = this.store.createRecord('manufacturer', {
        title: this.get('title'),
        description: this.get('description'),
        note: this.get('note')
      });

      var self = this;

      var onSuccess = function() {
        console.log('Handling save success.');
        self.transitionToRoute('manufacturers.list');
      };

      var onFail = function() {
        self.alert('there was an issue saving');
      };

      manufacturer.save().then(function(){
          console.log('saved');
        }).catch(function() {
          console.log('failed to save');
        });
      console.log(manufacturer.get('id'));

    }
  }
});
