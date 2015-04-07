import Ember from 'ember';

export default Ember.Route.extend({
  activate: function(){
    Pace.restart();
  },
  deactivate: function() {
    Pace.restart();
  }
});
