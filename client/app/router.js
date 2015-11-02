import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  // AUTH
  this.resource('auth', function() {
    this.route('login');
    this.route('request-access', function () {
      this.route('sent');
    });
    this.route('forgot-password');
    this.route('request-sent');
    this.route('loading');

    this.route('password', function() {
      this.route('reset', {path: '/reset/:password_token'});
      this.route('forgot');
    });
  });

  // User Resource
  this.route('users');
  this.resource('user', function() {
    this.route('detail', {path: '/detail/:id'});
    this.route('settings', {path: '/settings/:id'});
    this.route('new');
    this.route('edit');
  });

  this.resource('departments', function() {
    this.route('loading');
  });
  this.resource('department', function() {
    this.route('new');
    this.route('edit');
    this.route('detail', {path: '/detail/:id'});
  });

  // DASHBOARD
  this.route('dashboard');

  // MANUFACTURER
  this.route('manufacturers', function() {
    this.route('loading');
  });
  this.resource('manufacturer', function() {
    this.route('detail', {path: '/detail/:id'});
    this.route('new');
    this.route('edit');
  });

  this.resource('app', function() {
    this.route('loading');
  });
  this.route('app');
  this.resource('suppliers', function() {});
  this.resource('supplier', function() {});
  this.resource('order', function() {});
  this.resource('orders', function() {});
  this.resource('reports', function() {});
  this.resource('report', function() {});
  this.resource('settings', function() {});

  this.route('asset-list');
  this.resource('asset', function() {
    this.route('detail', {path: '/detail/:id'});
    this.route('assign', {path: '/assign/:id'});
    this.route('request', {path: '/request/:id'});
    this.route('new');
    this.route('edit');
  });

  this.resource('support', function() {
    this.route('manual');
    this.route('new');
    this.route('contact');
  });


  this.resource('unit', function() {
    this.route('detail', { path: '/detail/:id'});
    this.route('new', { path: '/new/:asset_id'});
  });

  this.route('assets', function() {
    this.route('loading');
  });
});


export default Router;
