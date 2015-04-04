import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn', 'default'],
  title: 'Close',
  click: function () {
    this.sendAction();
  }
});
