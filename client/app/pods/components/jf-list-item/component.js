import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['portlet box jf-list-item'],
  classNameBindings: ['item-color'],
  'item-color': function() {
    return  this.get('color');
  }.property('color')
});
