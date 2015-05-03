import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('asset.detail', {
      into: 'asset'
    });
  },
  model: function (args) {

    return Ember.RSVP.hash({
      asset: this.store.find('asset', args.id),
      units: this.store.find('asset', args.id).then(function(asset){
        return asset.get('units');
      })
    });
  },
  setupController: function (controller, models) {
    controller.set('asset', models.asset);
    controller.set('units', models.units);
    controller.set('host', this.container.lookup('application:main').get('host'));
  }
});
