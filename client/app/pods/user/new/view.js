import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {

    this.get('controller').on('dataDidChange', this, this.dataDidChange);
    this.get('controller').on('selectedDepartmentsDidAddDepartment', this, this.dataDidChange);

  },
  dataDidChange: function(multipleSelectValue) {
    setTimeout(function (){
      for(var i = 1; i <= multipleSelectValue.length; i++){
        $('#department_select option:nth-child(' + i.toString() +')').attr('selected', 'selected');
      }
      $("#department_select").trigger("chosen:updated");
    }, 15);
  },
  willDestroyElement: function(){
    var controller = this.get('controller');
    controller.set('firstname', '');
    controller.set('lastname', '');
    controller.set('email', '');
    controller.set('employee_id', '');
    controller.set('selectedDepartments',  Ember.A([]));
    controller.set('status', 'pending');
    controller.set('role', 'user');
  }
});
