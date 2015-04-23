import DS from 'ember-data';

export default DS.Model.extend({
  'description': DS.attr('string'),
  'title': DS.attr('string'),
  'note': DS.attr('string'),
  'assets': DS.hasMany('asset', { async:true })

});
