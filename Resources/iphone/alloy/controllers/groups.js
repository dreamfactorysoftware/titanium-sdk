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
    this.__controllerPath = "groups";
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
    var groups = Ti.UI.createWindow({
        backgroundColor: "white"
    });
    var nav = Ti.UI.iOS.createNavigationWindow({
        window: groups
    });
    nav.open();
    var imageView = Ti.UI.createImageView({
        image: "df-logo.png",
        height: 20
    });
    groups.titleControl = imageView;
    var backBtn = Ti.UI.createButton({
        title: "Logout"
    });
    groups.leftNavButton = backBtn;
    var addBtn = Ti.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.ADD
    });
    groups.rightNavButton = addBtn;
    backBtn.addEventListener("click", function() {});
    addBtn.addEventListener("click", function() {
        Alloy.createController("group_add");
    });
    var search = Ti.UI.createSearchBar({
        barColor: "#f0f0f0",
        borderColor: "#f0f0f0",
        height: 43,
        top: 0
    });
    groups.add(search);
    var tbl = Ti.UI.createTableView({
        touchEnabled: true,
        search: search,
        editable: true,
        top: 43
    });
    groups.add(tbl);
    tbl.addEventListener("click", function(e) {
        var arg = {
            group_id: e.row.id
        };
        Alloy.createController("group_show", arg);
    });
    var callback_groups = function(data) {
        var group = [];
        _.each(data.resource, function(element) {
            group.push({
                id: element.id,
                title: element.name
            });
        });
        tbl.setData(group);
    };
    apiModule.getRecords("contact_group", null, token, callback_groups);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;