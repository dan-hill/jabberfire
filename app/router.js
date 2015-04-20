import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  // Authorization Resource
  this.resource('auth', function() {
    this.route('login');
    this.route('request-access');
    this.route('forgot-password');
    this.route('request-sent');
  });

  // Application Resource
  this.resource('app', function() {
    // Dashboard
    this.route('dashboard');

    this.resource('assets', function() {
      this.route('list');
      this.route('detail', {path: '/detail/:id'});
    });

    // User Resource
    this.resource('user', function() {
      this.route('profile');
    });

    // Administrator Resource
    this.resource('admin', function() {
      this.resource('user-management', function() {});
    });

    this.resource('users', function() {
      this.route('list');
      this.route('profile', {path: '/profile/:id'});
    });

    this.resource('suppliers', function() {
      this.route('list');
      this.route('detail', {path: '/detail/:id'});
    });

    this.resource('manufacturers', function() {
      this.route('list');
      this.route('detail', {path: '/detail/:id'});
      this.route('new');
    });

    this.resource('reports', function() {});
    this.resource('messages', function() {});
    this.resource('orders', function() {});
    this.route('settings');
    this.route('loading');
  });

});

export default Router;
