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
    this.__controllerPath = "group_show";
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
    var args = arguments[0] || {};
    var token = Ti.App.Properties.getString("token");
    var group_id = args.group_id;
    var group_show = Ti.UI.createWindow({
        backgroundColor: "white"
    });
    var nav = Ti.UI.iOS.createNavigationWindow({
        window: group_show
    });
    nav.open();
    var imageView = Ti.UI.createImageView({
        image: "df-logo.png",
        height: 20
    });
    group_show.titleControl = imageView;
    var backBtn = Ti.UI.createButton({
        title: "Back"
    });
    group_show.leftNavButton = backBtn;
    var editBtn = Ti.UI.createButton({
        title: "Edit"
    });
    var addBtn = Ti.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.ADD
    });
    group_show.rightNavButtons = [ editBtn, addBtn ];
    var scrollView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true
    });
    group_show.add(scrollView);
    group_show.open();
    backBtn.addEventListener("click", function() {
        Alloy.createController("groups");
    });
    editBtn.addEventListener("click", function() {
        var args = {
            group_id: group_id
        };
        Alloy.createController("group_edit", args);
    });
    addBtn.addEventListener("click", function() {
        var args = {
            group_id: group_id
        };
        Alloy.createController("contact_add", args);
    });
    var search = Ti.UI.createSearchBar({
        barColor: "#f0f0f0",
        borderColor: "#f0f0f0",
        top: 0
    });
    group_show.add(search);
    var tbl = Ti.UI.createTableView({
        allowsSelection: false,
        touchEnabled: true,
        cancelBubble: true,
        search: search,
        editable: true,
        top: 45
    });
    group_show.add(tbl);
    tbl.addEventListener("singletap", function(e) {
        var arg = {
            contact_id: e.row.id,
            group_id: group_id
        };
        Alloy.createController("contact_show", arg);
    });
    var callback_contacts = function(data) {
        var contacts = [];
        _.each(data.resource, function(element) {
            contacts.push({
                id: element.id,
                title: element.first_name + " " + element.last_name
            });
        });
        tbl.setData(contacts);
    };
    var callback_contactids = function(data) {
        var contacts = [];
        _.each(data.resource, function(element) {
            contacts.push(element.contact_id);
        });
        if (contacts.length > 0) {
            var params = "?ids=" + contacts.join();
            apiModule.getRecords("contact" + params, null, token, callback_contacts);
        }
    };
    var params = "?filter=contact_group_id%3D" + group_id + "&fields=contact_id";
    apiModule.getRecords("contact_group_relationship" + params, null, token, callback_contactids);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;