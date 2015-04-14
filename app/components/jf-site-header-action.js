import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }
});
