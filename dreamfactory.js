var Promise = require('Promise');
//enter your DSP URI , without the trailing /
var BASE_PATH = "YOUR_DSP.com";
var END_POINT = "/rest";
//enter the app_name from the app you created to use with titanium
var APP_KEY = "YOUR_APP_NAME";
var SESSION_ID = "";
exports.makeRequest = function(method, path, body) {
    var promise = Promise.defer();
    var url = BASE_PATH + END_POINT + path;
    var client = Titanium.Network.createHTTPClient();
    client.onload = function() {
        try {
            var data = JSON.parse(this.responseText);
            promise.resolve(data);

        } catch (e) {
            promise.reject(e);
        }
    };
    client.onerror = function() {
        promise.reject(this);
    };

    client.open(method, url);
    client.setRequestHeader("X-DREAMFACTORY-APPLICATION-NAME", APP_KEY);
    client.setRequestHeader("X-DREAMFACTORY-SESSION-TOKEN", SESSION_ID);
    client.send(body);

    return promise;
};
