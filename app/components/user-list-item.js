import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: [''],
  firstname: undefined,
  lastname: undefined,
  roles: undefined,
  actions: {
    toggleSelected: function() {
      this.toggleProperty('selected');
      if(this.selected){
        this.$().find('.portlet').addClass('note note-default');
      } else {
        this.$().find('.portlet').removeClass('selected');
      }

    }
  }
});
