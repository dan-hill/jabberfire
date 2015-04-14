import Ember from 'ember';

export default Ember.ArrayController.extend({
  manufacturerlist: undefined,
  filteredContent: function() {
    var manufacturerObjects = this.get('manufacturerlist');
    var manufacturersArray = [];

    manufacturerObjects.forEach(function(manufacturerObject){
      var manufacturerArray = [];
      manufacturerArray.push(manufacturerObject.get('title'));
      manufacturerArray.push(manufacturerObject.get('description'));
      manufacturerArray.push(manufacturerObject.get('note'));
      manufacturersArray.push(manufacturerArray);
    });
    return manufacturersArray;
  }.property('manufacturerlist.@each'),
  actions: {
    'open-add-manufacturer-modal': function() {
      this.send('openModal', 'jf-modal-add-manufacturer.hbs');
    }
  }
});
