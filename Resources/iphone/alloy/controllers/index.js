function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    var index = Ti.UI.createWindow({
        backgroundColor: "white"
    });
    var nav = Ti.UI.iOS.createNavigationWindow({
        window: index
    });
    nav.open();
    var imageView = Ti.UI.createImageView({
        image: "df-logo.png",
        height: 20
    });
    index.titleControl = imageView;
    var scrollView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true
    });
    index.add(scrollView);
    index.open();
    var loginEmail = Ti.UI.createTextField({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        hintText: "Email",
        top: 30,
        left: 25,
        right: 25,
        height: 40
    });
    scrollView.add(loginEmail);
    var loginPassword = Ti.UI.createTextField({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        hintText: "Password",
        top: 75,
        left: 25,
        right: 25,
        height: 40
    });
    scrollView.add(loginPassword);
    var signinBtn = Ti.UI.createButton({
        top: 135,
        height: 40,
        backgroundColor: "#d86a27",
        left: 50,
        right: 50,
        borderRadius: 5,
        borderColor: "#d86a27",
        color: "#fff",
        title: "Sign In",
        font: {
            fontSize: "24"
        }
    });
    scrollView.add(signinBtn);
    var registerBtn = Ti.UI.createButton({
        top: 185,
        height: 40,
        backgroundColor: "#6baab2",
        left: 50,
        right: 50,
        borderRadius: 5,
        borderColor: "#6baab2",
        color: "#fff",
        title: "Register",
        font: {
            fontSize: "24"
        }
    });
    scrollView.add(registerBtn);
    registerBtn.addEventListener("click", function() {
        Alloy.createController("register");
    });
    var loginResponse = function(data) {
        Ti.App.Properties.setString("token", data.session_token);
        Alloy.createController("groups");
    };
    signinBtn.addEventListener("click", function() {
        apiModule.login(loginEmail.value, loginPassword.value, loginResponse);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;