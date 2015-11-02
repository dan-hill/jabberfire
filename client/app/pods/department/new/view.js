import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    this.get('controller').on('dataDidChange', this, this.dataDidChange);
    this.get('controller').on('selectedDepartmentsDidAddDepartment', this, this.dataDidChange);

  },
  dataDidChange: function(multipleSelectValue) {
    console.log(multipleSelectValue);
    setTimeout(function (){
      for(var i = 1; i <= multipleSelectValue.length; i++){
        $('#department_select option:nth-child(' + i.toString() +')').attr('selected', 'selected');
      }
      $("#department_select").trigger("chosen:updated");
    }, 5);
  },
});
