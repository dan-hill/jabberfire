import DS from 'ember-data';

export default DS.Model.extend({
  'firstname': DS.attr('string'),
  'lastname': DS.attr('string'),
  'type': DS.attr('string'),
  'to_user': DS.belongsTo('user', {async: true}),
  'from_user': DS.attr('number')
});

