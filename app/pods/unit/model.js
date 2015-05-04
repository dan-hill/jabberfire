import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  'status': DS.attr('string'),
  'purhase_cost':DS.attr('number'),
  'warranty_expiration': DS.attr('date'),
  'end_of_life': DS.attr('date'),
  'tag': DS.attr('string'),
  'image':DS.attr('string'),
  'note': DS.attr('string'),

  'asset': DS.belongsTo('asset', {async: true})
});
