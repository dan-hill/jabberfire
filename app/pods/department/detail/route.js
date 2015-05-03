import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('department.detail', {
      into: 'department'
    });
  },
  model: function (args) {
    return Ember.RSVP.hash({
      department: this.store.find('department', args.id),
      users: this.store.find('user')
    });
  },
  setupController: function (controller, models) {
    controller.set('department', models.department);
    controller.set('users', models.users)
  }
});
