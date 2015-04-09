import DS from 'ember-data';

export default DS.Model.extend({
  'description': DS.attr('string'),
  'title': DS.attr('string'),
  'serial': DS.attr('string'),
  'model': DS.attr('string'),
  'status': DS.attr('string'),
  'quantity_on_hand': DS.attr('number'),
  'max_quantity':DS.attr('number'),
  'min_quantity':DS.attr('number'),
  'tag': DS.attr('string'),
  'image':DS.attr('string'),
  'note': DS.attr('string'),
  'purchase_cost': DS.attr('string'),
  'warranty_expiration': DS.attr('string'),
  'end_of_life':  DS.attr('string'),
  'requestable':  DS.attr('boolean')
});
