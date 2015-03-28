import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'login',
  afterRender: function() {
    Ember.$('body').addClass('login');
    Metronic.init();
    Login.init();
    Layout.init();
  }
});
