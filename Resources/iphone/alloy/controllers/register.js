function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function registerUser() {
        apiModule.register(registerFirstname.value, registerLastname.value, registerEmail.value, registerPassword.value, callback_register);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "register";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var register = Ti.UI.createWindow({
        backgroundColor: "white"
    });
    var scrollView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true
    });
    register.add(scrollView);
    register.open();
    var nav = Ti.UI.iOS.createNavigationWindow({
        window: register
    });
    nav.open();
    var backBtn = Ti.UI.createButton({
        title: "Back"
    });
    register.leftNavButton = backBtn;
    var doneBtn = Ti.UI.createButton({
        title: "Done"
    });
    register.rightNavButton = doneBtn;
    backBtn.addEventListener("click", function() {
        Alloy.createController("index");
    });
    doneBtn.addEventListener("click", function() {
        registerUser();
    });
    var imageView = Ti.UI.createImageView({
        image: "df-logo.png",
        height: 20
    });
    register.titleControl = imageView;
    var registerFirstname = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "First Name",
        top: 20,
        left: 25,
        right: 25,
        height: 40
    });
    scrollView.add(registerFirstname);
    var registerLastname = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "Last Name",
        top: 65,
        left: 25,
        right: 25,
        height: 40
    });
    scrollView.add(registerLastname);
    var registerEmail = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "Email",
        top: 110,
        left: 25,
        right: 25,
        height: 40
    });
    scrollView.add(registerEmail);
    var registerPassword = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "Password",
        top: 155,
        left: 25,
        right: 25,
        height: 40
    });
    scrollView.add(registerPassword);
    var callback_register = function(data) {
        Ti.App.Properties.setString("token", data.session_token);
        Alloy.createController("groups");
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;