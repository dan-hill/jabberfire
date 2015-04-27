import Ember from 'ember';

export default Ember.ArrayController.extend(Ember.Evented, {
  actionMessage: null,
  statuses: [
    {id: 'pending',   name: 'Pending'},
    {id: 'active',    name: 'Active'},
    {id: 'inactive',  name: 'Inactive'}
  ],
  roles: [
    {id: 1, name: 'User'},
    {id: 2, name: 'Technician'},
    {id: 3, name: 'Administrator'}
  ],
  observeable_options: function(){
    this.trigger('dataDidChange', this.get('multipleSelectValue'));
  }.observes('options.@each'),
  options: function() {
    var self = this;
    var multipleSelectValue = this.get('multipleSelectValue')
    var fucking_array = Ember.A([]);

    if(multipleSelectValue === undefined || multipleSelectValue.length <= 0){
      return this.get('department_list').filter(function(department){return department.get('parent_id') == null});
    }

    var dept = this.get('department_list').find(function(department){return department.get('id') == multipleSelectValue.get('lastObject')});

    if(dept.get('parent_id') == null){
      fucking_array.addObject(dept);
      return fucking_array.addObjects(this.get('department_list').filter(function(department){return department.get('parent_id') == dept.get('id')}));
    }


    var parent = this.get('department_list').find(function(department){
      return department.get('id') == dept.get('parent_id');
    });

    if(parent != null){
      fucking_array.addObject(dept);
    }

    while(parent.get('parent_id') !== null){
      fucking_array.pushObject(parent);
      parent = this.get('department_list').find(function(department){return department.get('id') == parent.get('parent_id')})
    }
    fucking_array.addObject(parent);
    fucking_array.addObject(dept).reverse();

    var fuckity = fucking_array.addObjects(this.get('department_list').filter(function(department){return department.get('parent_id') == dept.get('id')}))
    return fuckity


  }.property('multipleSelectValue.@each', 'department_list', 'department_list.@each'),


  selectedDepartments: Ember.A([]),
  selectedDepartmentsObserver: function(){
    var department_paths = Ember.A([]);

    var selected_departments = this.get('selectedDepartments');
    for(var i = 0; i < selected_departments.length; i++){
      var inner_dept_path = Ember.A([]);
      var dept = selected_departments[i];

      var parent = this.get('department_list').find(function(d){
        return d.get('id') == dept.get('parent_id');
      });

      if(parent != undefined) {
        inner_dept_path.addObject(dept);


        while (parent.get('parent_id') !== null) {
          inner_dept_path.pushObject(parent);
          parent = this.get('department_list').find(function (d) {
            return d.get('id') == parent.get('parent_id')
          })
        }
      }
      inner_dept_path.addObject(parent);
      inner_dept_path.addObject(dept).reverse();

      department_paths.addObject(inner_dept_path);
    }

    selected_departments = Ember.A([]);
    return department_paths;
  }.property('selectedDepartments.@each', 'selectedDepartments'),
  actions: {
    didTouchUpOnAddDepartment: function(){

      console.log(this.get('multipleSelectValue'))
      var multipleSelectValue = this.get('multipleSelectValue');

      var department = this.get('department_list').find(
        function(department){
          return department.get('id') == multipleSelectValue.get('lastObject')
        });
      this.get('selectedDepartments').addObject(department);
      this.set('multipleSelectValue', []);
      $("#department_select").trigger("chosen:updated");

    },
    didTouchUpOnSave: function(){
      var user = this.get('store').createRecord('user', {
        'firstname': this.get('firstname'),
        'lastname': this.get('lastname'),
        'email': this.get('email'),
        'employee_id': this.get('employee_id'),
        'status': this.get('selectedStatus')
      })

      var role = this.get('store').find('role', this.get('selectedRole'));

      user.get('roles').pushObject(role);

      var departments = this.get('selectedDepartments');

      user.get('departments').pushObjects(selectedDepartments);
    }
  }
});
