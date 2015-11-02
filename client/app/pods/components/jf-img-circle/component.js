import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  classNames: ['img-circle'],
  attributeBindings: ['src'],
  'src': '',
  classNameBindings: ['addon-class'],
  'addon-class': function() {
    return this.get('class');
  }.property('class')
});
