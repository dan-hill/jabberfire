/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/bootstrap/dist/css/bootstrap.css.map');

app.import('bower_components/bootstrap/dist/js/bootstrap.js');

app.import('bower_components/simple-line-icons/css/simple-line-icons.css');
app.import('bower_components/jquery.uniform/jquery.uniform.js');
app.import('bower_components/jquery.uniform/themes/default/css/uniform.default.css');
app.import('bower_components/jquery-validate/dist/jquery.validate.js')

app.import('vendor/metronic/js/metronic.js');
app.import('vendor/metronic/js/layout.js');
app.import('vendor/metronic/js/login.js');

app.import('vendor/custom/login.css');
app.import('vendor/custom/components.css');
app.import('vendor/custom/plugins.css');
app.import('vendor/custom/layout.css');
app.import('vendor/metronic/themes/darkblue.css')
app.import('vendor/custom/custom.css');

module.exports = app.toTree();

