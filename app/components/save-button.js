import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn', 'green', 'submit'],
  title: 'Save',
  click: function () {
    this.sendAction();
  }
});

