import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['page-content'],
  willInsertElement: function(){
    var nav_items = $('.page-sidebar-menu li');
    nav_items.removeClass('active');
    nav_items.removeClass('open');

    var this_nav = $('#'+this.get('id')+'-nav');
    this_nav.addClass('active');
    this_nav.addClass('open');
  }
});

