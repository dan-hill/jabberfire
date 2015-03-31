import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'admin/user-management',
  didInsertElement: function() {
    Ember.$('body').addClass('page-header-fixed');
    Ember.$('body').addClass('page-quick-sidebar-over-content');
    Ember.$('body').addClass('page-style-square');
    Metronic.init();
    Login.init();
    Layout.init();
    Index.init();
    Index.initDashboardDaterange();
    Index.initJQVMAP(); // init index page's custom scripts
    Index.initCalendar(); // init index page's custom scripts
    Index.initCharts(); // init index page's custom scripts
    Index.initChat();
    Index.initMiniCharts();
    Tasks.initDashboardWidget();
    CCMH.init();
  }
});
