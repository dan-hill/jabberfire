import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-fit-height', 'grey-salt', 'dropdown-toggle'],
  attributeBindings: ['data-toggle', 'data-hover', 'data-delay', 'data-close-others'],
  'data-toggle': 'dropdown',
  'data-hover': 'dropdown',
  'data-delay': '1000',
  'data-close-others': 'true'
});
