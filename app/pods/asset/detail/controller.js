/*global Ember*/
import Ember from 'ember';

export default Ember.ArrayController.extend(Ember.Evented, {
  actions: {
    didTouchUpOnStartEditing: function () {
     console.log(this.get('units'));
    },
    didTouchUpOnEndEditing: function () {
      var self = this;
      self.set('editing', false);
      $('#email').editable('option', 'disabled', true);
      $('#employee_id').editable('option', 'disabled', true);

    },
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
    }
  },
  unitlist: undefined,
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



  selectedSort: 'tag',
  selectedSortDirection: 'ascending',
  sorted: function() {
    var units = this.get('asset').get('units');
    var selected_sort = this.get('selectedSort');
    var selected_sort_direction = this.get('selectedSortDirection');

    if(selected_sort_direction == 'ascending'){
      return units.sortBy(selected_sort);
    }

    if(selected_sort_direction == 'descending'){
      return units.sortBy(selected_sort).reverse();
    }
  }.property('selectedSortDirection', 'selectedSort', 'asset.units.@each'),

  filter: '',
  current_filter: 'tag',
  filterables: [
    {name: "Tag", value: 'tag'}
  ],
  filtered: function(){
    this.set('filter', this.get('filter').trim());
    var self = this;
    var units = this.get('sorted');
    var filter = this.get('filter').toLowerCase();
    var field = this.get('current_filter');
    return units.filter(function(unit){
      if(unit.get(field) === undefined){return false}
      return ~unit.get(field).toLowerCase().indexOf(filter);
    });
  }.property( 'filter', 'current_filter', 'sorted.@each'),

  sliced: function(){
    return this.get('filtered').slice(this.get('renderStart'), this.get('renderStart') + this.get('pageSize'));
  }.property('renderStart', 'filtered', 'sliced.@each', 'pageSize'),


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
