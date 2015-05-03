import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
  },
  willDestroyElement: function(){
    this.get('controller').set('filter', '');
  }
});
