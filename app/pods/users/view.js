import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
        var menu_item = $('#user-nav > a');
        menu_item.addClass('open active');
        menu_item.add('span');
      },
      willDestroyElement: function() {
        var menu_item = Ember.$('#suppliers-navigation-item');
        menu_item.removeClass('open active');
        menu_item.find('#menu-item-decorator').removeClass('selected');
        this.get('controller').set('filter', '');
      }
});
