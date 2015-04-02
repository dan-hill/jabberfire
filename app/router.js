import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('auth', function() {
    this.route('login');
    this.route('request-access');
  });
  this.resource('app', function() {

    this.route('dashboard');

    this.resource('user', function() {
      this.route('profile');
    });

    this.resource('admin', function() {
      this.resource('user-management', function() {});
    });

  });

  this.resource('inventory', function() {});
});

export default Router;
