import Ember from 'ember';

export default Ember.Route.extend({
  activate: function(){
    NProgress.start();
  },
  deactivate: function() {
    NProgress.done();
  }
});
