import Ember from 'ember';

export default Ember.ArrayController.extend({
  didInsertElement: function() {
    var options = {
      valueNames: [ 'name', 'born' ],
      item: '<li><h3 class="name"></h3><p class="born"></p></li>'
    };

    var values = [{
      name: 'Jonny Strömberg',
      born: 1986
    },
      {
        name: 'Jonas Arnklint',
        born: 1985
      },
      {
        name: 'Martina Elm',
        born: 1986
      }];

    var userList = new List('users', options, values);

    userList.add({
      name: "Gustaf Lindqvist",
      born: 1983
    });
  },
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
