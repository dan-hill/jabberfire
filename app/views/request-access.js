import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'request-access',
  didInsertElement: function () {
    Ember.$('body').addClass('register-form');
    Metronic.init();
    Login.init();
    Layout.init();
  }

});
