import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'auth',
  didInsertElement: function() {
    Ember.$('body').addClass('auth');

  },
  willDestroyElement: function() {
    Ember.$('body').removeClass('auth');
  }
});
