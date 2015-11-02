import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function () {
    this.render('unit.new', {
      into: 'unit'
    });
  },
  model: function(args){
    return this.store.find('asset', args.asset_id);
  },
  setupController: function (controller, model) {
    controller.set('asset', model);
    var tag = function () {
      var d = new Date().getTime();
      return 'xxxxxxxD-xxxA-xxxxN'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
      }).toUpperCase();
    };
    controller.set('tag', tag())
  }
});
