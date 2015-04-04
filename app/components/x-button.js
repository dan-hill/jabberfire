import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['close'],
  click: function () {
    this.sendAction();
  }
});
