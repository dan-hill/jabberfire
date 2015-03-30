import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['dropdown', 'dropdown-user'],
  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }
});
