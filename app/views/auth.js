import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'auth',
  didInsertElement: function() {
    Metronic.init();
    Login.init();
    Layout.init();
    Tasks.initDashboardWidget();
    CCMH.init();
  }
});
