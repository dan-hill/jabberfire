import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'auth/password/reset',

  didInsertElement: function() {
    Ember.$('body').addClass('login');

  },
  willDestroyElement: function() {
    Ember.$('body').removeClass('login');
  }
});
