function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function populateInfos(info, index) {
        var x = 215 * index;
        var win = Ti.UI.createView({
            backgroundColor: "#7093b5",
            top: 425 + x,
            left: 25,
            right: 25,
            height: 200
        });
        scrollView.add(win);
        var contactNoteHeadline = Ti.UI.createLabel({
            color: "white",
            font: {
                fontSize: 20
            },
            text: info.info_type,
            top: 435 + x,
            left: 50
        });
        scrollView.add(contactNoteHeadline);
        var contactPhone = Ti.UI.createLabel({
            color: "white",
            font: {
                fontSize: 16
            },
            text: info.phone,
            top: 475 + x,
            left: 110
        });
        scrollView.add(contactPhone);
        var contactPhoneImg = Ti.UI.createImageView({
            image: "phone.png",
            width: 20,
            top: 515 + x,
            left: 75
        });
        scrollView.add(contactPhoneImg);
        var contactEmail = Ti.UI.createLabel({
            color: "white",
            font: {
                fontSize: 16
            },
            text: info.email,
            top: 515 + x,
            left: 110
        });
        scrollView.add(contactEmail);
        var contactEmailImg = Ti.UI.createImageView({
            image: "mail.png",
            width: 20,
            top: 475 + x,
            left: 75
        });
        scrollView.add(contactEmailImg);
        var contactAddress = Ti.UI.createTextArea({
            backgroundColor: "#7093b5",
            color: "white",
            font: {
                fontSize: 16
            },
            value: info.address + "\n" + info["city"] + ", " + info.state + " " + info.zip + "\n" + info.country,
            top: 545 + x,
            left: 110,
            right: 25,
            height: 65
        });
        scrollView.add(contactAddress);
        var contactAddressImg = Ti.UI.createImageView({
            image: "home.png",
            width: 20,
            top: 555 + x,
            left: 75
        });
        scrollView.add(contactAddressImg);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "contact_show";
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
    var args = arguments[0] || {};
    var group_id = args.group_id;
    var contact_id = args.contact_id;
    var contact_show = Ti.UI.createWindow({
        backgroundColor: "white"
    });
    var scrollView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true
    });
    contact_show.add(scrollView);
    contact_show.open();
    var nav = Ti.UI.iOS.createNavigationWindow({
        window: contact_show
    });
    nav.open();
    var backBtn = Ti.UI.createButton({
        title: "Back"
    });
    contact_show.leftNavButton = backBtn;
    var editBtn = Ti.UI.createButton({
        title: "Edit"
    });
    contact_show.rightNavButton = editBtn;
    backBtn.addEventListener("click", function() {
        var arg = {
            group_id: group_id
        };
        Alloy.createController("group_show", arg);
    });
    editBtn.addEventListener("click", function() {
        var args = {
            group_id: group_id,
            contact_id: contact_id
        };
        Alloy.createController("contact_edit", args);
    });
    var imageView = Ti.UI.createImageView({
        image: "df-logo.png",
        height: 20
    });
    contact_show.titleControl = imageView;
    var contactPhoto = Ti.UI.createImageView({
        image: "default_portrait.png",
        width: 185,
        top: 10
    });
    scrollView.add(contactPhoto);
    var contactName = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: 24
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: 200
    });
    scrollView.add(contactName);
    var contactTwitterImg = Ti.UI.createImageView({
        image: "twitter2.png",
        width: 20,
        top: 240,
        left: 25
    });
    scrollView.add(contactTwitterImg);
    var contactTwitterName = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: 16
        },
        top: 240,
        left: 55
    });
    scrollView.add(contactTwitterName);
    var contactSkypeImg = Ti.UI.createImageView({
        image: "skype.png",
        width: 20,
        top: 280,
        left: 25
    });
    scrollView.add(contactSkypeImg);
    var contactSkypeName = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: 16
        },
        top: 280,
        left: 55
    });
    scrollView.add(contactSkypeName);
    var contactNotesHeadline = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: 20
        },
        text: "Notes",
        top: 325,
        left: 25
    });
    scrollView.add(contactNotesHeadline);
    var contactNotesText = Ti.UI.createTextArea({
        color: "black",
        font: {
            fontSize: 16
        },
        top: 345,
        left: 40,
        right: 25
    });
    scrollView.add(contactNotesText);
    var callback_contact = function(data) {
        contactName.text = data.first_name + " " + data.last_name;
        contactTwitterName.text = data.twitter;
        contactSkypeName.text = data.skype;
        contactNotesText.value = data.notes;
    };
    apiModule.getRecords("contact/" + contact_id, null, token, callback_contact);
    var callback_infos = function(data) {
        _.each(data.resource, function(element, index) {
            populateInfos(element, index);
        });
    };
    var params = "?filter=contact_id%3D" + contact_id;
    apiModule.getRecords("contact_info" + params, null, token, callback_infos);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;