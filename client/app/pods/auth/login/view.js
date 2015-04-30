import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'auth/login',

  didInsertElement: function() {
    Ember.$('body').addClass('login');

  },
  willDestroyElement: function() {
    Ember.$('body').removeClass('login');
  }
});
