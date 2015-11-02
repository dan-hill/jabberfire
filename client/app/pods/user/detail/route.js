import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('user.detail', {
      into: 'user'
    });
  },
  model: function (args) {

    return Ember.RSVP.hash({
      user: this.store.find('user', args.id),
      departments: this.store.find('department')
    });
  },
  setupController: function (controller, models) {
    controller.set('user', models.user);
    controller.set('departments', models.departments);
    controller.set('host', this.container.lookup('application:main').get('host'));
  }
});
