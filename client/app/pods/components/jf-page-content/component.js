import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['page-content-wrapper'],
  attributeBindings: ['elementID:id'],
  elementID: "progress-container"
});
