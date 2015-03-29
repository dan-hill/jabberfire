import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('user');
  this.route('login');
  this.route('request-access');
  this.route('dashboard');
});

export default Router;
