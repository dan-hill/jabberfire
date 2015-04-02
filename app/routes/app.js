import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller){
    var userroles = [];
    var required = [3];
    var is_admin = undefined;

    try {
      // Ain't got not time for this shit
      this.get('session.currentUser.roles').forEach(function (role) {
        if (role % 1 === 0) {
          userroles.push(parseInt(role));
        } else {
          userroles.push(parseInt(role.id));
        }
      });


      required.forEach(function (req) {
        if (Ember.$.inArray(req, userroles) == -1) {
          is_admin = false;
          throw('stopit')
        } else {
          is_admin = true;
        }
      });
    } catch (e) {

    }
    controller.set('is_admin', is_admin);
  },
  renderTemplate: function() {


    this.render('app', {
      into: 'application'
    });
  }
});
