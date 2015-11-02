import Ember from 'ember';

export default Ember.Controller.extend({
  scannerValueObserver: function(){
    console.log('got')
  }.observes('readScanValue')
});
