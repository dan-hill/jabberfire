import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
    console.log('inserted')
    this.$('#table-spot').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>' );
    console.log(this.get('controller.filteredContent'));
    $('#example').dataTable( {
      "data": this.get('controller.filteredContent'),
      "columns": [
        { "title": "title" }
      ]
    } );
  }
});
