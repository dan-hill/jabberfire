import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  // Authorization Resource
  this.resource('auth', function() {
    this.route('login');
    this.route('request-access', function() {
      this.route('sent');
    });
    this.route('forgot-password');
    this.route('request-sent');
    this.route('loading');
  });

  // User Resource
  this.resource('users', function() {});
  this.resource('user', function() {
    this.route('detail', {path: '/detail/:id'});
    this.route('new');
    this.route('edit');
  });

  this.route('dashboard');


  // Application Resource
  this.resource('app', function() {
    // Dashboard


    this.resource('assets', function() {
      this.route('list');
      this.route('detail', {path: '/detail/:id'});
    });



    // Administrator Resource
    this.resource('admin', function() {
      this.resource('user-management', function() {});
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

  this.route('loading');

  this.resource('manufacturer', function() {
    this.route('new');
    this.route('edit');
    this.route('detail');
  });
  this.resource('asset', function() {
    this.route('new');
    this.route('edit');
    this.route('detail');
  });
});

export default Router;
