function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addInfo(index) {
        var x = 380 * index;
        var contactType = Ti.UI.createTextField({
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            hintText: "Type",
            top: 310 + x,
            left: 25,
            right: 25,
            height: 40
        });
        scrollView.add(contactType);
        var contactPhone = Ti.UI.createTextField({
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            hintText: "Phone",
            top: 355 + x,
            left: 25,
            right: 25,
            height: 40
        });
        scrollView.add(contactPhone);
        var contactEmail = Ti.UI.createTextField({
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            hintText: "Email",
            top: 400 + x,
            left: 25,
            right: 25,
            height: 40
        });
        scrollView.add(contactEmail);
        var contactAddress = Ti.UI.createTextField({
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            hintText: "Address",
            top: 445 + x,
            left: 25,
            right: 25,
            height: 40
        });
        scrollView.add(contactAddress);
        var contactCity = Ti.UI.createTextField({
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            hintText: "City",
            top: 490 + x,
            left: 25,
            right: 25,
            height: 40
        });
        scrollView.add(contactCity);
        var contactState = Ti.UI.createTextField({
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            hintText: "State",
            top: 535 + x,
            left: 25,
            right: 25,
            height: 40
        });
        scrollView.add(contactState);
        var contactZip = Ti.UI.createTextField({
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            hintText: "Zip",
            top: 580 + x,
            left: 25,
            right: 25,
            height: 40
        });
        scrollView.add(contactZip);
        var contactCountry = Ti.UI.createTextField({
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            hintText: "Country",
            top: 625 + x,
            left: 25,
            right: 25,
            height: 40
        });
        scrollView.add(contactCountry);
        infoCount++;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "contact_add";
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
    var token = Ti.App.Properties.getString("token");
    var infoCount = 0;
    var args = arguments[0] || {};
    var group_id = args.group_id;
    args.contact_id;
    var contact_add = Ti.UI.createWindow({
        backgroundColor: "white"
    });
    var scrollView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true
    });
    contact_add.add(scrollView);
    contact_add.open();
    var nav = Ti.UI.iOS.createNavigationWindow({
        window: contact_add
    });
    nav.open();
    var backBtn = Ti.UI.createButton({
        title: "Back"
    });
    contact_add.leftNavButton = backBtn;
    var doneBtn = Ti.UI.createButton({
        title: "Done"
    });
    contact_add.rightNavButton = doneBtn;
    backBtn.addEventListener("click", function() {
        var arg = {
            group_id: group_id
        };
        Alloy.createController("group_show", arg);
    });
    doneBtn.addEventListener("click", function() {
        var firstName = "";
        var lastName = "";
        var twitter = "";
        var skype = "";
        var notes = "";
        for (var x = 0; 5 > x; x++) {
            "First Name" == scrollView.children[x].hintText && (firstName = scrollView.children[x].value);
            "Last Name" == scrollView.children[x].hintText && (lastName = scrollView.children[x].value);
            "Twitter" == scrollView.children[x].hintText && (twitter = scrollView.children[x].value);
            "Skype" == scrollView.children[x].hintText && (skype = scrollView.children[x].value);
            "Notes" == scrollView.children[x].hintText && (notes = scrollView.children[x].value);
        }
        var params = {
            data: {
                first_name: firstName,
                last_name: lastName,
                twitter: twitter,
                skype: skype,
                notes: notes
            }
        };
        apiModule.setRecord("contact", params, token, callback_contactadd);
    });
    var imageView = Ti.UI.createImageView({
        image: "df-logo.png",
        height: 20
    });
    contact_add.titleControl = imageView;
    var contactFirstname = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "First Name",
        top: 20,
        left: 25,
        right: 25,
        height: 40
    });
    scrollView.add(contactFirstname);
    var contactLastname = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "Last Name",
        top: 65,
        left: 25,
        right: 25,
        height: 40
    });
    scrollView.add(contactLastname);
    var contactTwitterName = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "Twitter",
        top: 110,
        left: 25,
        right: 25,
        height: 40
    });
    scrollView.add(contactTwitterName);
    var contactSkypeName = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "Skype",
        top: 155,
        left: 25,
        right: 25,
        height: 40
    });
    scrollView.add(contactSkypeName);
    var contactNotes = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "Notes",
        top: 200,
        left: 25,
        right: 25,
        height: 40
    });
    scrollView.add(contactNotes);
    var addAddrBtn = Ti.UI.createButton({
        top: 255,
        height: 40,
        backgroundColor: "#6baab2",
        left: 25,
        right: 25,
        borderRadius: 5,
        borderColor: "#6baab2",
        color: "#fff",
        title: "Add New Address",
        font: {
            fontSize: "16"
        }
    });
    scrollView.add(addAddrBtn);
    addAddrBtn.addEventListener("click", function() {
        addInfo(infoCount);
    });
    var callback_contactadd = function(data) {
        var new_id = data.resource[0].id;
        var params = {
            data: {
                contact_group_id: group_id,
                contact_id: new_id
            }
        };
        apiModule.setRecord("contact_group_relationship", params, token, null);
        var infos = (scrollView.children.length - 1 - 5) / 8;
        for (var e = 0; infos > e; e++) {
            var start = 6 + 8 * e;
            var end = start + 8;
            var phone = "", email = "", address = "", city = "", state = "", zip = "", country = "";
            for (var x = start; end > x; x++) {
                "Type" == scrollView.children[x].hintText && (type = scrollView.children[x].value);
                "Phone" == scrollView.children[x].hintText && (phone = scrollView.children[x].value);
                "Email" == scrollView.children[x].hintText && (email = scrollView.children[x].value);
                "Address" == scrollView.children[x].hintText && (address = scrollView.children[x].value);
                "City" == scrollView.children[x].hintText && (city = scrollView.children[x].value);
                "State" == scrollView.children[x].hintText && (state = scrollView.children[x].value);
                "Zip" == scrollView.children[x].hintText && (zip = scrollView.children[x].value);
                "Country" == scrollView.children[x].hintText && (country = scrollView.children[x].value);
            }
            var params = {
                data: {
                    ordinal: 0,
                    contact_id: new_id,
                    info_type: type,
                    phone: phone,
                    email: email,
                    address: address,
                    city: city,
                    state: state,
                    zip: zip,
                    country: country
                }
            };
            apiModule.setRecord("contact_info", params, token, null);
        }
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;