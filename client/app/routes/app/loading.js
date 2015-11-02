import Ember from 'ember';

export default Ember.Route.extend({
  activate: function(){
    NProgress.configure({
      parent: '.page-container',
      showSpinner: false});
    console.log('starting nprogress...')
    NProgress.start();
  },
  deactivate: function() {
    console.log('done.')
    NProgress.done();
  }
});
