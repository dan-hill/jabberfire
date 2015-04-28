import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function () {
    this.render('department.new', {
      into: 'department'
    });
  },
  model: function(){
    return this.store.find('department');
  },
  setupController: function (controller, model) {
    controller.set('department_list', model);
  }
});
