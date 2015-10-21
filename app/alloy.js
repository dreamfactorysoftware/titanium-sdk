// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//var apiModule = require('/ApiModule');

var APP_API_KEY = '055e6ad5dbfb74620853ae873e848e83dbfa0fe8ed1e89f7bdaa1c9bfbf5860d';
var INSTANCE_URL = 'http://localhost:8081';

var apiModule = require('/ApiModule');