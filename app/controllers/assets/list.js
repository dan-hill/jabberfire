import Ember from 'ember';

export default Ember.ArrayController.extend({
  assetlist: undefined,
  filter: '',
  filterFields: ['model', 'serial'],
  filteredContent: function() {
    var filter = this.get('filter');
    var self = this;
    return this.get('assetlist').filter(function(item){


        var flat;

        self.get('filterFields').forEach(function(field){
          if(item.get(field) !== undefined){
            flat = flat + ' ' + item.get(field);
          }
        });

        if(flat !== undefined){
          var filters = filter.split(" ");


          for (var i=0; i< filters.length; i++) {
            if(!flat.toLowerCase().match(filter.toLowerCase().replace(/\s+/g,' ').trim())){
              return false;
            }
          }
          return true;
        }

      }
    );

  }.property('filter', 'assetlist.@each'),
  actions: {
    openAddAssetModal: function() {
      this.send('openModal', 'modal-add-asset');
    }
  }
});
