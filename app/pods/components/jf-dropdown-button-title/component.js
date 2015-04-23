import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['btn btn-circle btn-default'],
  attributeBindings: ['data-toggle'],
  'data-toggle': 'dropdown'
});
