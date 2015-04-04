import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'login',
  didInsertElement: function() {
    Ember.$('body').addClass('login');

  }
});
