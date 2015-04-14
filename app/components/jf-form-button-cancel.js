import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn', 'green', 'pull-right'],
  click: function () {
    this.sendAction();
  }
});
