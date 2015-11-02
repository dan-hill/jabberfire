/*global Ember*/
import Ember from 'ember';

export default Ember.ArrayController.extend(Ember.Evented, {
  actions: {
    didTouchUpOnForcePasswordChange: function(){
      var host = this.get('host')
      var user_id = this.get('user').get('id');
      var url = host + "/password/force/" + user_id;

      $.getJSON(url).success(function() {
        console.log('forced');
      }).then(function() {
        console.log('failed')
      });
    },
    didTouchUpOnStartEditing: function(){
      var self = this;
      self.set('editing', true)

      $('#email').editable('option', 'disabled', false);
      $('#email').editable({
        type: 'text',
        title: 'Enter email',
        success: function(response, newValue) {
          var user = self.get('user');
          user.set('email', newValue);
          user.save();
        }
      });

      $('#employee_id').editable('option', 'disabled', false);
      $('#employee_id').editable({
        type: 'text',
        title: 'Enter Employee ID',
        success: function(response, newValue) {
          var user = self.get('user');
          user.set('employee_id', newValue);
          user.save();
        }
      });
    },
    didTouchUpOnEndEditing: function(){
      var self = this;
      self.set('editing', false);
      $('#email').editable('option', 'disabled', true);
      $('#employee_id').editable('option', 'disabled', true);

    },

    didTouchUpOnAddDepartment: function () {
      var multiple_select_value = this.get('multipleSelectValue');
      var selected_departments = this.get('selectedDepartments');
      var departments = this.get('departments');
      var user = this.get('user')

      if (multiple_select_value !== undefined && multiple_select_value.length > 0) {

        var department = departments.find(function (department) {
          return department.get('id') == multiple_select_value.get('lastObject')
        });

        user.get('departments').addObject(department);
        user.save();

        this.set('multipleSelectValue', []);

        $("#department_select").trigger("chosen:updated");
      }
    },
    didTouchUpOnRemoveDepartment: function(department){

      var user = this.get('user');

      if(department.length == 1){
        department = department.objectAt(0);
      } else {
        department = department.get('lastObject');
      }


      user.get('departments').removeObject(department);
      user.save();
    }
  },
  observeable_options: function () {
    this.trigger('dataDidChange', this.get('multipleSelectValue'));
  }.observes('options.@each'),

  options: function () {
    var self = this;
    var multipleSelectValue = this.get('multipleSelectValue');
    var fucking_array = Ember.A([]);
    var departments = this.get('departments');

      // Show only top level departments when select is empty.
      if (multipleSelectValue === undefined || multipleSelectValue.length <= 0) {
        return departments.filter(function (department) {
          console.log(department.get('parent_id') == null)
          return department.get('parent_id') == null
        });
      }

      // Get the last selected department
      var dept = departments.find(function (department) {
        return department.get('id') == multipleSelectValue.get('lastObject')
      });

      // Stop return if last selected department is at the top
      if (dept.get('parent_id') == null) {
        fucking_array.addObject(dept);
        return fucking_array.addObjects(departments.filter(function (department) {
          return department.get('parent_id') == dept.get('id')
        }));
      }

      // get the selected departments parent
      var parent = departments.find(function (department) {
        return department.get('id') == dept.get('parent_id');
      });


      // add last selected object
      if (parent != null) {
        fucking_array.addObject(dept);
      }

      while (parent.get('parent_id') !== null) {
        fucking_array.pushObject(parent);
        parent = departments.find(function (department) {
          return department.get('id') == parent.get('parent_id')
        })
      }
      fucking_array.addObject(parent);
      fucking_array.addObject(dept).reverse();

      var fuckity = fucking_array.addObjects(departments.filter(function (department) {
        return department.get('parent_id') == dept.get('id')
      }))
    console.log(fuckity);
      return fuckity
  }.property('multipleSelectValue.@each', 'departments.@each', 'multipleSelectValue'),


  selectedDepartmentsObserver: function () {
    var department_paths = Ember.A([]);
    var selected_departments = this.get('user').get('departments');
    var departments = this.get('departments');

    if(departments == undefined){
      return Ember.A([])
    }
    for (var i = 0; i < selected_departments.length; i++) {
      var inner_dept_path = Ember.A([]);
      var dept = selected_departments.objectAt(i);

      dept.set('last', true)

      var parent = departments.find(function (d) {
        return d.get('id') == dept.get('parent_id');
      });

      if (parent != undefined) {
        inner_dept_path.addObject(dept);


        while (parent.get('parent_id') !== null) {
          inner_dept_path.pushObject(parent);
          parent = departments.find(function (d) {
            return d.get('id') == parent.get('parent_id')
          })
        }
      }
      inner_dept_path.addObject(parent);
      inner_dept_path.addObject(dept).reverse();
      if (inner_dept_path.get('lastObject') == undefined) {
        inner_dept_path.pop()
      }
      department_paths.addObject(inner_dept_path);
    }
    return department_paths;
  }.property('departments', 'user.departments.@each', 'user.departments')
});
