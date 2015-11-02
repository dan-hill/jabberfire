import DS from 'ember-data';

export default DS.Model.extend({
  'description': DS.attr('string'),
  'name': DS.attr('string'),
  'max_quantity':DS.attr('number'),
  'min_quantity':DS.attr('number'),
  'image':DS.attr('string'),
  'note': DS.attr('string'),
  'manufacturer': DS.belongsTo('manufacturer', {async: true}),
  'units': DS.hasMany('unit', {async: true})
});
