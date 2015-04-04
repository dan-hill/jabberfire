import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['modal-header'],
  title: 'Modal Title',
  actions: {
    close: function(){
      this.sendAction('x-action');
    }
  }
});

