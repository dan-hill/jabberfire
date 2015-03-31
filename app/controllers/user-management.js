import Ember from 'ember';

export default Ember.Controller.extend({
  userlist: undefined,
  actions: {
    clickedThis: function(){
      this.set('userlist', this.get('model'));
    }
  }
});
