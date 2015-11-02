export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}

import Ember from "ember";

import Session from "simple-auth/session";

export default {
  name: "custom-session",
  before: "simple-auth",
  initialize: function(container) {
    Session.reopen({
      setCurrentUser: function() {
        var accessToken = this.get('token');
        var self = this;

        if (!Ember.isEmpty(accessToken)) {
          return container.lookup('store:main').find('user', 'me').then(function(user) {
            self.set('currentUser', user);
          });
        }
      }.observes('token')
    });
  }
};
