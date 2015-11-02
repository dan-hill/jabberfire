import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      $('.modal').modal('hide');

      this.send('removeModal')
    },
    close: function(){
      $('.modal').modal('hide');
      this.send('removeModal')
    }
  }
});

