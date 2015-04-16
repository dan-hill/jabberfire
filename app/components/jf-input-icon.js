import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['input-icon', 'right'],
  willInsertElement: function(){
    this.set('iconClasses', 'fa fa-info tooltips');
    this.set('iconCaption', 'default-caption')
  },
  updateStatus: function(){

    if(this.get('status') === 'error'){
      this.set('iconClasses', 'fa fa-exclamation validation-fail tooltips');
      this.set('iconCaption', this.get('error-caption'))
    } else if(this.get('status') === 'success'){
      this.set('iconClasses', 'fa fa-check validation-success tooltips');
      this.set('iconCaption', this.get('success-caption'))
    } else {
      this.set('iconClasses', 'fa fa-info validation-fail tooltips');
      this.set('iconCaption', this.get('default-caption'))
    }
  }.observes('status'),

  'icon-classes': function() {
    return this.get('iconClasses');
  }.property('iconClasses'),
  'caption': function() {
    return this.get('iconCaption');
  }.property('iconCaption')
});
