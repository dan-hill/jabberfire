import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'admin/user-management',
  didInsertElement: function() {
    var admin_menu_item = Ember.$('#admin-navigation-item');
    var user_management_menu_item = Ember.$('#user-management-menu-item');
    admin_menu_item
      .addClass('active open')
      .find('#menu-item-decorator')
      .addClass('selected');

    admin_menu_item
      .find('#submenu-arrow')
      .addClass('open');

    admin_menu_item
      .children('.sub-menu:not(.always-open)')
      .slideDown(500);

    user_management_menu_item
      .addClass('active');

    user_management_menu_item
      .find('#menu-item-decorator')
      .addClass('selected');
  },
  willDestroyElement: function() {
    var admin_menu_item = Ember.$('#admin-navigation-item');
    var user_management_menu_item = Ember.$('#user-management-menu-item');

    admin_menu_item
      .removeClass('active open')
      .find('#menu-item-decorator')
      .removeClass('selected');

    admin_menu_item
      .find('#submenu-arrow')
      .removeClass('open');

    user_management_menu_item
      .removeClass('active');

    user_management_menu_item
      .find('#menu-item-decorator')
      .addClass('selected');
  }
});
