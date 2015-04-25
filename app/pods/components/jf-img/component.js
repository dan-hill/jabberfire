import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['src'],
  'src': '',
  classNameBindings: ['addon-class'],
  'addon-class': function() {
    return this.get('class');
  }.property('class')
});
