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
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      testGlobalVar: 'this is a test thingy'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self' https://cdn.mxpnl.com", // Allow scripts from https://cdn.mxpnl.com
      'font-src': "'self' http://fonts.gstatic.com", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self' *", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
      'img-src': "*",
      'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
      'media-src': "'self'"
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
      serverTokenEndpoint: 'http://localhost:8080/auth',
      identificationField: 'username',
      passwordField: 'password',
      tokenPropertyName: 'token',
      authorizationPrefix: 'Bearer ',
      authorizationHeaderName: 'Authorization',
      headers: {},
      refreshAccessTokens: true,
      timeFactor: 1,
      refreshLeeway: 300, // Refresh the token 5 minutes (300s) before it expires.
      serverTokenRefreshEndpoint: 'http://localhost:8080/auth/refresh',
      tokenExpireName: 'exp'
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
