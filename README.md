titanium-dreamfactory
=====================
This module gives you the ability to consume your DreamFactory REST API from within titanium.

This module uses CommonJS promises, so include the Promises.js file along with the dreamfactory.js file.
The code below assumes they reside in the same directory as the file requring them.

Useage :

```javascript
//GET DATA
//*** NOTE : If you run these in the same controller you'll only need to do the following line once.
var Promise = require('Promise');
var dreamfactory = require('dreamfactory');
	dreamfactory.makeRequest("get","/db/todo").then(function(response) {
	    Ti.API.info(response.record);
	}, function(error){
	    Ti.API.info(error);
	});

//POST DATA
var Promise = require('Promise');
var body = {name:"go buy your lunch" , complete:false};
		body = JSON.stringify(body);
		dreamfactory.makeRequest("post","/db/todo", body).then(function(response) {
			Ti.API.info(response);
		}, function(error){
			Ti.API.info(error);
		});
//UPDATE DATA
var Promise = require('Promise');
var body = {name:"go eat your lunch" , complete:false, id :1310};
		body = JSON.stringify(body);
		dreamfactory.makeRequest("put","/db/todo", body).then(function(response) {
			Ti.API.info(response);
		}, function(error){
			Ti.API.info(error);
		});

//DELETE DATA
var Promise = require('Promise');
dreamfactory.makeRequest("delete","/db/todo/1310").then(function(response) {
			Ti.API.info(response);
		}, function(error){
			Ti.API.info(error);
		});
		
//LOGGING IN
var Promise = require('Promise');
	var dreamfactory = require('dreamfactory');
	
		var body = {email:"youremail" , password : "password"};
		body = JSON.stringify(body);
		dreamfactory.makeRequest("post","/user/session", body).then(function(response) {
			SESSION_ID = response.session_id;
		}, function(error){
			Ti.API.info(error);
		});

//LOGGING OUT
var Promise = require('Promise');
	var dreamfactory = require('dreamfactory');
		dreamfactory.makeRequest("delete","/user/session").then(function(response) {
			Ti.API.info("user logged out");
		}, function(error){
			Ti.API.info(error);
		});

```


