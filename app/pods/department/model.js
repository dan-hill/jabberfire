import DS from 'ember-data';

export default DS.Model.extend({
  'name': DS.attr('string'),
  'description': DS.attr('string'),
  'parent_id': DS.attr('number'),
  'children': DS.hasMany('department', { async:false })
});

