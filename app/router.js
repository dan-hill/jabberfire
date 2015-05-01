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
  });

  // User Resource
  this.resource('users', function() {});
  this.resource('user', function() {
    this.route('detail', {path: '/detail/:id'});
    this.route('settings', {path: '/settings/:id'});
    this.route('new');
    this.route('edit');
  });

  // DASHBOARD
  this.route('dashboard');

  // MANUFACTURER
  this.resource('manufacturers', function() {});
  this.resource('manufacturer', function() {
    this.route('detail', {path: '/detail/:id'});
    this.route('new');
    this.route('edit');
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
    this.route('new');
    this.route('edit');
  });
  this.resource('support', function() {
    this.route('manual');
    this.route('new');
    this.route('contact');
  });

  this.resource('departments', function() {});
  this.resource('department', function() {
    this.route('new');
    this.route('edit');
    this.route('detail', {path: '/detail/:id'});
  });
});


export default Router;
