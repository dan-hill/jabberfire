/*global Ember */
import Ember from 'ember';

export default Ember.ArrayController.extend({
  manufacturerlist: undefined,
  pageSize: '15',
  selectedPage: 1,
  renderEnd: 10,

  pageSizes:[
    {name: "15", value: '15'},
    {name: "25", value: '25'},
    {name: "50", value: '50'},
    {name: "100", value: '100'}

  ],

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



  selectedSort: 'title',
  selectedSortDirection: 'ascending',
  sorted: function() {
    var manufacturers = this.get('manufacturers');
    var selected_sort = this.get('selectedSort');
    var selected_sort_direction = this.get('selectedSortDirection');

    if(selected_sort_direction == 'ascending'){
      return manufacturers.sortBy(selected_sort);
    }

    if(selected_sort_direction == 'descending'){
      return manufacturers.sortBy(selected_sort).reverse();
    }
  }.property('selectedSortDirection', 'selectedSort', 'manufacturers.@each'),

  filter: '',
  current_filter: 'title',
  filterables: [
    {name: "Name", value: 'title'}
  ],
  filtered: function(){
    this.set('filter', this.get('filter').trim());
    var self = this;
    var manufacturers = this.get('sorted');
    var filter = this.get('filter').toLowerCase();
    var field = this.get('current_filter');
    return manufacturers.filter(function(manufacturer){
      if(manufacturer.get(field) === undefined){return false}
      return ~manufacturer.get(field).toLowerCase().indexOf(filter);
    });
  }.property( 'filter', 'current_filter', 'sorted.@each'),

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
      if(this.get('selectedPage') !== this.get('pages').length){
        this.set('selectedPage', this.get('selectedPage') + 1);
      }
    },
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
