import Ember from 'ember';

export default Ember.ArrayController.extend({
  manufacturerlist: undefined,
  filter: '',
  filterFields: ['title'],
  filteredContent: function() {
    var filter = this.get('filter');
    var self = this;
    return this.get('manufacturerlist').filter(function(item, index, enumerable){



          return true;


      }
    );

  }.property('filter', 'manufacturerlist.@each'),
  actions: {
    'open-add-manufacturer-modal': function() {
      this.send('openModal', 'jf-modal-add-manufacturer.hbs')
    }
  }
});
