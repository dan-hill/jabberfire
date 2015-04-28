import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{

  model: function () {

    return this.store.find('user');
  },
  setupController: function (controller, model) {


    controller.set('model', model);
    controller.get('model').filter(function(record){return record.get('id') == null}).forEach(function(m){
      m.deleteRecord();
    });
  },
  renderTemplate: function () {
    this.render('users', {
      into: 'app',
      outlet: 'content'
    });
  },
  afterModel:function(){
  }
});

