import Ember from 'ember';

export default Ember.View.extend({
  tagName: '',
  templateName: 'user/detail',
  dataDidChange: function(multipleSelectValue) {
    setTimeout(function (){
      for(var i = 1; i <= multipleSelectValue.length; i++){
        $('#department_select option:nth-child(' + i.toString() +')').attr('selected', 'selected');
      }
      $("#department_select").trigger("chosen:updated");
    }, 25);
  },
  didInsertElement: function() {
    $('#email').editable('option', 'disabled', true);
    $('#employee_id').editable('option', 'disabled', true);

    this.get('controller').on('dataDidChange', this, this.dataDidChange);
    this.get('controller').on('selectedDepartmentsDidAddDepartment', this, this.dataDidChange);

  }
});
