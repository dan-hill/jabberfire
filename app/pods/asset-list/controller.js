import Ember from 'ember';

export default Ember.ArrayController.extend({


  pages: function(){
    var filtered_list = this.get('filtered');
    var page_size = this.get('pageSize');
    return _.range(1, (filtered_list.length / page_size) + 1);
  }.property('pages.@each', 'filtered', 'pageSize'),

  renderStart: function(){
    return (this.get('selectedPage') - 1) * this.get('pageSize');
  }.property('selectedPage','renderStart'),

  sorted: function() {
    var assets = this.get('assets');
    var selected_sort = this.get('selectedSort');
    var selected_sort_direction = this.get('selectedSortDirection');

    if(selected_sort_direction == 'ascending'){
      return assets.sortBy(selected_sort);
    }

    if(selected_sort_direction == 'descending'){
      return assets.sortBy(selected_sort).reverse();
    }
  }.property('selectedSortDirection', 'selectedSort', 'assets.@each'),

  filtered: function(){
    if(this.get('table_filter') === undefined) return Ember.A([]);

    var self = this;
    var assets = this.get('sorted');
    var filter = this.get('table_filter').toLowerCase();
    var field = this.get('current_filter');
    return assets.filter(function(asset){
      if(asset.get(field) === undefined){return false}
      return ~asset.get(field).toLowerCase().indexOf(filter);
    });


  }.property( 'table_filter', 'current_filter', 'sorted.@each'),

  sliced: function(){
    return this.get('filtered').slice(this.get('renderStart'), this.get('renderStart') + this.get('pageSize'));
  }.property('renderStart', 'filtered', 'sliced.@each', 'pageSize'),

  actions: {
    sortBy:function(selected_sort) {
      this.set('selectedSort', selected_sort);

      if (this.get('selectedSortDirection') == 'ascending') {
        this.set('selectedSortDirection', 'descending');
      } else {
        this.set('selectedSortDirection', 'ascending');
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
      if(this.get('pages').length !== undefined){
        if(this.get('selectedPage') !== this.get('pages').length){
          this.set('selectedPage', this.get('selectedPage') + 1);
        }
      }

    },
    didTouchUpOnCheckout: function(asset){
      var role = this.get('session.currentUser.role');

      if(role == 'administrator' || role == 'technician'){
        this.transitionToRoute('asset.assign', asset.get('id'));
      } else {
        this.transitionToRoute('asset.request', asset.get('id'));
      }
    }
  },
  disablePaginationWalking: function(){
    if(this.get('pages') !== undefined) return;

    if(this.get('selectedPage') !== 1){
      $('.pagination .previous').removeClass('disabled');
    } else {
      $('.pagination .previous').addClass('disabled');
    }
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
