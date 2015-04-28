/*global Ember */
import Ember from 'ember';

export default Ember.ArrayController.extend({
  manufacturerlist: undefined,
  pageSize: 15,
  selectedPage: 1,
  renderEnd: 10,
  filter: '',
  current_filter: 'title',

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

  filterables: [
    {name: "Name", value: 'title'}
  ],

  filtered: function(){
    this.set('filter', this.get('filter').trim());
    var self = this;
    var manufacturers = this.get('model');
    var filter = this.get('filter').toLowerCase();
    var field = this.get('current_filter');
    return manufacturers.filter(function(manufacturer){
      if(manufacturer.get(field) === undefined){return false}
      return ~manufacturer.get(field).toLowerCase().indexOf(filter);
    });
  }.property( 'filter', 'current_filter', 'model'),

  sliced: function(){
    return this.get('filtered').slice(this.get('renderStart'), this.get('renderStart') + this.get('pageSize'));
  }.property('renderStart', 'filtered', 'sliced.@each'),

  actions: {
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

