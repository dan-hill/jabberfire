/*global Ember */
import Ember from 'ember';

export default Ember.ArrayController.extend({

  pages: function(){

    var number_of_pages = this.get('filtered').length / this.get('pageSize');
    var page_array = [];
    for(var i = 0; i < number_of_pages; i++){
      page_array.push(i + 1);
    }
    return page_array;
  }.property('pages.@each', 'filtered', 'pageSize'),

  renderStart: function(){
    return (this.get('selectedPage') - 1) * this.get('pageSize');
  }.property('selectedPage','renderStart'),

  sorted: function() {

    var self = this;
    var users = this.get('users');
    var sort_value = this.get('sortValue');
    var order = this.get('sortOrder');

    return _.sortByOrder(users, function(user){
      return user.get(sort_value)
    }, order)
  }.property('sortValueDirection', 'sortValue', 'users.@each', 'users'),


  filtered: function(){
    if(this.get('table_filter') === undefined) return Ember.A([]);

    var users = this.get('sorted');
    var filter = this.get('table_filter');
    var field = this.get('current_filter');

    return _.filter(users, function(user, x, y){
      return  ~user.get(field).toLowerCase().trim().indexOf(filter)
    });

  }.property( 'table_filter', 'current_filter', 'sorted.@each'),

  sliced: function(){
    return this.get('filtered').slice(this.get('renderStart'), this.get('renderStart') + this.get('pageSize'));
  }.property('renderStart', 'filtered', 'sliced.@each', 'pageSize'),

  actions: {
    sortBy:function(selected_sort) {
      this.set('sortValue', selected_sort);

      if (this.get('sortValueDirection') == 'ascending') {
        this.set('sortValueDirection', 'descending');
      } else {
        this.set('sortValueDirection', 'ascending');
      }
    },
    didSelectPage: function(){
      this.set('selectedPage', parseInt($(event.target).text()));
    },
    previousPage: function(){
      if(this.get('selectedPage') > 1){
        this.set('selectedPage', this.get('selectedPage') - 1);
      }
    },
    nextPage: function(){
      if(this.get('selectedPage') !== this.get('pages').length){
        this.set('selectedPage', this.get('selectedPage') + 1);
      }
    },
    didTouchUpOnBulkChangeStatus: function(){
      this.send('showModal', 'users/change-status')
    },
    didTouchUpOnSaveBulkChangeStatus: function(status){
      var self = this;
      var checked = $('.md-check').filter(':checked').map(function(){return this.id.split('x')[1]});

      checked.each(function(index, user_id){
        var user = self.get('model').find(function(user){return user.get('id') == user_id});
        console.log(status)
        user.set('status', status);
        user.save()
      })
    },
    didTouchUpOnBulkChangeRole: function(){
      this.send('showModal', 'users/change-role')
    },
    didTouchUpOnSaveBulkChangeRole: function(role){
      var self = this;
      var checked = $('.md-check').filter(':checked').map(function(){return this.id.split('x')[1]});
      checked.each(function(index, user_id){
        var user = self.get('model').find(function(user){return user.get('id') == user_id});
        user.set('role', role);
        user.save()
      })
    },
    didTouchUpOnChangeStatus: function(status, user_id){
      var self = this;
      var user = self.get('users').find(function(user){return user.get('id') == user_id});
      user.set('status', status);
      user.save();
    },
    didTouchUpOnChangeRole: function(role, user_id){
      var self = this;
      var user = self.get('users').find(function(user){return user.get('id') == user_id});
      user.set('role', role);
      user.save().then();

    }
  },
  disablePaginationWalking: function(){
    console.log(this.get('selectedPage'));
    if(this.get('selectedPage') !== 1){
      $('.pagination .previous').removeClass('disabled');
    } else {
      $('.pagination .previous').addClass('disabled');
    }
    console.log(this.get('pages').length);
    if(this.get('selectedPage') === this.get('pages').length){
      $('.pagination .next').removeClass('disabled');
    } else {
      $('.pagination .next').addClass('disabled');
    }
  }.observes('selectedPage'),
  pageinationIndicator: function(){
    $('.pagination li').removeClass('active');
    $('.page-' + this.get('selectedPage')).addClass('active');
  }.observes('selectedPage')

});
