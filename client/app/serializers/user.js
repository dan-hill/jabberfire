import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    roles: {embedded: 'always'},
    departments: {embedded: 'always'}
  }
});
