import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    clickedThis: function(){
      var userlist = this.get('model');
      console.log(userlist)
    }
  }
});
