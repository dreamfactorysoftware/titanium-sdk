
exports.login = function(email, password, callback) {
	var credentials = {		
	                    data: {
	                        email: email,
	                        password: password
	                    }
					};
	
	var xhr = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	var response = JSON.parse(this.responseData);
	         callback(response);
	     },
	     onerror : function(e) {
	         alert(this.responseText);
	     },
	     timeout : 5000
	});
	xhr.open('POST', INSTANCE_URL + '/api/v2/user/session');
	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.send(credentials);
};

exports.logout = function(callback) {

	
	var xhr = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	var response = JSON.parse(this.responseData);
	         callback(response);
	     },
	     onerror : function(e) {
	         alert(this.responseText);
	     },
	     timeout : 5000
	});
	xhr.open('DELETE', INSTANCE_URL + '/api/v2/user/session');
	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.send();
};

exports.register = function(first_name, last_name, email, password, callback) {
	var user = {		
	                    data: {
	                        first_name: first_name,
	                        last_name: last_name,
	                        email: email,
	                        new_password: password
	                    }
					};
	
	var xhr = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	var response = JSON.parse(this.responseData);
	         callback(response);
	     },
	     onerror : function(e) {
	         alert(this.responseText);
	     },
	     timeout : 5000
	});
	xhr.open('POST', INSTANCE_URL + '/api/v2/user/register?login=true');
	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.send(user);
};


exports.getRecords = function(table, params, token, callback) {
	var xhr = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	var response = JSON.parse(this.responseData);
	         callback(response);
	     },
	     onerror : function(e) {
	         alert(this.responseText);
	     },
	     timeout : 5000
	});
	xhr.open('GET', INSTANCE_URL + '/api/v2/db/_table/' + table);

	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.setRequestHeader("X-DreamFactory-API-Key", APP_API_KEY);
    xhr.setRequestHeader("X-DreamFactory-Session-Token", token);
	
	xhr.send(params);
};

exports.setRecord = function(table, params, token, callback) {	
	var xhr = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	var response = JSON.parse(this.responseData);	         
	        if (typeof callback == 'function') {
	        	callback(response);
	        }
	         
	     },
	     onerror : function(e) {
	         alert(this.responseText);
	     },
	     timeout : 5000
	});
	xhr.open('POST', INSTANCE_URL + '/api/v2/db/_table/' + table);

	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.setRequestHeader("X-DreamFactory-API-Key", APP_API_KEY);
    xhr.setRequestHeader("X-DreamFactory-Session-Token", token);
	
	xhr.send(params);
};	 


	
exports.deleteRecord = function(table, params, token, callback) {
	var xhr = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	var response = JSON.parse(this.responseData);	         
	        if (typeof callback == 'function') {
	         	callback(response);
	        }
	         
	     },
	     onerror : function(e) {
	         alert(this.responseText);
	     },
	     timeout : 5000
	});

	xhr.open('DELETE', INSTANCE_URL + '/api/v2/db/_table/' + table + '?' + params);

	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.setRequestHeader("X-DreamFactory-API-Key", APP_API_KEY);
    xhr.setRequestHeader("X-DreamFactory-Session-Token", token);
	
	xhr.send();
};	

exports.updateRecord = function(table, params, token, callback) {
	var xhr = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	var response = JSON.parse(this.responseData);
	         
	        if (typeof callback == 'function') {
	         	callback(response);
	        }  
	     },
	     onerror : function(e) {
	         alert(this.responseText);
	     },
	     timeout : 5000
	});

	xhr.open('PATCH', INSTANCE_URL + '/api/v2/db/_table/' + table);

	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.setRequestHeader("X-DreamFactory-API-Key", APP_API_KEY);
    xhr.setRequestHeader("X-DreamFactory-Session-Token", token);
	
	xhr.send(params);
};

