import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'modal',
  tagName: 'div',
  classNames: ['modal'],
  didInsertElement: function(){
    this.$().attr('id', 'modal');
    this.$().modal('show');
  },
  willDestroyElement: function() {
    this.$().modal('hide');
  }
});
