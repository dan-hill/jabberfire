export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}

import Ember from "ember";

var globals = Ember.Object.extend({
  organization:{
    name: {
      long: 'Comanche County Memorial Hospital',
      short: 'CCMH'
    }
  }
});

export default {
  name: 'globals',
  initialize: function(container, application) {
    container.typeInjection('component', 'store', 'store:main');
    application.register('global:variables', globals, {singleton: true});
    application.inject('controller', 'globals', 'global:variables');
  }
};
