import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'users/list',
  didInsertElement: function() {
    var user_menu_item = Ember.$('#users-navigation-item');

    user_menu_item
      .addClass('active open')
      .find('#menu-item-decorator')
      .addClass('selected');


  },
  willDestroyElement: function() {
    var user_menu_item = Ember.$('#users-navigation-item');

    user_menu_item
      .removeClass('active open')
      .find('#menu-item-decorator')
      .removeClass('selected');

  }
});

