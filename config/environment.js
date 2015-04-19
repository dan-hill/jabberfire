/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'capstone-frontend',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    }
  };
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.APP = {
      // Here you can pass flags/options to your application instance
      // when it is created
      host: 'http://localhost:5000/api'
    };

    ENV.contentSecurityPolicy = {
      'default-src': "*",
      'script-src': "*", // Allow scripts from https://cdn.mxpnl.com
      'font-src': "*", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "*", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
      'img-src': "*",
      'style-src': "*", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
      'media-src': "*"
    };

    ENV['simple-auth'] = {
      crossOriginWhitelist: ['*'],
      authorizer: 'simple-auth-authorizer:token',
      store: 'simple-auth-session-store:local-storage',
      authenticationRoute: 'auth.login',
      routeAfterAuthentication: 'app.dashboard',
      routeIfAlreadyAuthenticated: 'app.dashboard'
    };

    ENV['simple-auth-token'] = {
      serverTokenEndpoint: 'http://localhost:5000/api/token',
      identificationField: 'username',
      passwordField: 'password',
      tokenPropertyName: 'token',
      authorizationPrefix: 'Bearer ',
      authorizationHeaderName: 'Authorization',
      headers: {},
      refreshAccessTokens: true,
      timeFactor: 1,
      refreshLeeway: 300, // Refresh the token 5 minutes (300s) before it expires.
      serverTokenRefreshEndpoint: 'http://localhost:5000/api/token',
      tokenExpireName: 'exp'
    };
  }

  if (environment === 'test') {
    ENV.APP = {
      // Here you can pass flags/options to your application instance
      // when it is created
    };
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.APP = {
      // Here you can pass flags/options to your application instance
      // when it is created
      host: 'http://aw3so.me/api'
    };

    ENV.contentSecurityPolicy = {
      'default-src': "*",
      'script-src': "*", // Allow scripts from https://cdn.mxpnl.com
      'font-src': "*", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "*", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
      'img-src': "*",
      'style-src': "*", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
      'media-src': "*"
    };

    ENV['simple-auth'] = {
      crossOriginWhitelist: ['*'],
      authorizer: 'simple-auth-authorizer:token',
      store: 'simple-auth-session-store:local-storage',
      authenticationRoute: 'auth.login',
      routeAfterAuthentication: 'app.dashboard',
      routeIfAlreadyAuthenticated: 'app.dashboard'
    };

    ENV['simple-auth-token'] = {
      serverTokenEndpoint: 'http://aw3so.me/api/token',
      identificationField: 'username',
      passwordField: 'password',
      tokenPropertyName: 'token',
      authorizationPrefix: 'Bearer ',
      authorizationHeaderName: 'Authorization',
      headers: {},
      refreshAccessTokens: true,
      timeFactor: 1,
      refreshLeeway: 300, // Refresh the token 5 minutes (300s) before it expires.
      serverTokenRefreshEndpoint: 'http://aw3so.me/api/token',
      tokenExpireName: 'exp'
    };
  }

  return ENV;
};
