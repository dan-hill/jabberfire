import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'suppliers',
  didInsertElement: function() {
      var menu_item = Ember.$('#suppliers-navigation-item');
      menu_item.addClass('open active');
      menu_item.find('#menu-item-decorator').addClass('selected');
  },
  willDestroyElement: function() {
    var menu_item = Ember.$('#suppliers-navigation-item');
    menu_item.removeClass('open active');
    menu_item.find('#menu-item-decorator').removeClass('selected');
  }
});
