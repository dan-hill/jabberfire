import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'auth',
  didInsertElement: function() {
    Ember.$('body').addClass('auth');

    Metronic.init();
    Login.init();
    Layout.init();
    CCMH.init();
  }
});
