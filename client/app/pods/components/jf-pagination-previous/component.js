import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['previous'],
  click: function() {
    this.sendAction();
  }
});
