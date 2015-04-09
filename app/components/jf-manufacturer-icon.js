import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  classNames: ['manufacturer-icon'],
  attributeBindings: ['src'],
  'src': function() {
     return 'img/manufacturer/'+this.get('manufacturer')+'-'+this.get('size');
  }.property('path')
});
