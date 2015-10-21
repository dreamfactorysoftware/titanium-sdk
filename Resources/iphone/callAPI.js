var defaultMessage = "Hello world";

exports.sayHello = function(msg) {
    Ti.API.info("Hello " + msg);
};

exports.helloWorld = function() {
    Ti.API.info(defaultMessage);
};