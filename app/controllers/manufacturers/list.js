import Ember from 'ember';

export default Ember.ArrayController.extend({
  manufacturerlist: undefined,
  filter: '',
  filterFields: ['title'],
  filteredContent: function() {
    var filter = this.get('filter');
    var self = this;
    var mmms = [];
    this.get('manufacturerlist').forEach(function(m){
      var mm = [];
      mm.push(m.get('title'));
      mm.push(m.get('description'));
      mm.push(m.get('note'))
      mmms.push(mm);
    });
    return mmms;
  }.property('manufacturerlist.@each'),
  actions: {
    'open-add-manufacturer-modal': function() {
      this.send('openModal', 'jf-modal-add-manufacturer.hbs')
    }
  }
});
