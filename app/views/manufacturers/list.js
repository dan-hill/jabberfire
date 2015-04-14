import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
    var table_container = this.$('#table-spot');

    table_container.html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>' );

    var table = this.$('#example');

    table.dataTable( {
      "data": this.get('controller.filteredContent'),
      "columns": [
        { "title": "title" },
        { "title": "title" },
        { "title": "title" }
      ]
    } );
  }
});
