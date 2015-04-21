import Ember from 'ember';

export default Ember.ArrayController.extend({
  userlist: undefined,

  pages: function(){
    var number_of_pages = this.get('filtered').length / this.get('pageSize');
    var page_array = [];
    for(var i = 0; i < number_of_pages; i++){
      page_array.push(i + 1);
    }

    return page_array;
  }.property('pages.@each', 'filtered', 'pageSize'),

  pageSize: 10,
  selectedPage: 1,
  renderStart: function(){
    return (this.get('selectedPage') - 1) * this.get('pageSize');
  }.property('selectedPage','renderStart'),
  renderEnd: 10,
  filter: '',
  filterField: 'firstname',
  filterables: ['firstname'],
  filtered: function(){
    var self = this;
    var users = this.get('model');
    var filter = this.get('filter').toLowerCase();
    var field = this.get('filterField');

    return users.filter(function(user){
      if(user.get('firstname') === undefined){return false}
      return ~user.get('firstname').toLowerCase().indexOf(filter);
    });
  }.property( 'filter'),
  sliced: function(){
    return this.get('filtered').slice(this.get('renderStart'), this.get('renderStart') + 10);
  }.property('renderStart', 'filtered', 'sliced.@each'),
  actions: {
    openAddUserModal: function() {
      this.send('openModal', 'modal-add-user');
    },
    selectPage: function(){
      this.set('selectedPage', parseInt($(event.target).text()));
      console.log(this.get('selectedPage'))
    }
  }


});
