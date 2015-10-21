function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function save_relations(group_id) {
        var selected = _.filter(tbl.data[0].rows, function(obj) {
            return 1 == obj.selected;
        });
        _.each(selected, function(element) {
            var params = {
                data: {
                    contact_group_id: group_id,
                    contact_id: element.id
                }
            };
            apiModule.setRecord("contact_group_relationship", params, token, null);
        });
        Alloy.createController("groups");
    }
    function save_group() {
        tbl.data[0].rows.length;
        var group = {
            data: {
                name: tf1.value
            }
        };
        apiModule.setRecord("contact_group", group, token, callback_group);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "group_add";
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
    var group_add = Ti.UI.createWindow({
        backgroundColor: "white"
    });
    var nav = Ti.UI.iOS.createNavigationWindow({
        window: group_add
    });
    nav.open();
    var imageView = Ti.UI.createImageView({
        image: "df-logo.png",
        height: 20
    });
    group_add.titleControl = imageView;
    var backBtn = Ti.UI.createButton({
        title: "Back"
    });
    group_add.leftNavButton = backBtn;
    var doneBtn = Ti.UI.createButton({
        title: "Done"
    });
    group_add.rightNavButton = doneBtn;
    var scrollView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true
    });
    group_add.add(scrollView);
    group_add.open();
    backBtn.addEventListener("click", function() {
        Alloy.createController("groups");
    });
    doneBtn.addEventListener("click", function() {
        save_group();
    });
    var imageView = Ti.UI.createImageView({
        image: "df-logo.png",
        height: 20
    });
    group_add.titleControl = imageView;
    var tf1 = Ti.UI.createTextField({
        color: "#336699",
        top: 15,
        hintText: "Group Name"
    });
    group_add.add(tf1);
    var search = Ti.UI.createSearchBar({
        barColor: "#f0f0f0",
        borderColor: "#f0f0f0",
        showCancel: false,
        height: 43,
        top: 50
    });
    group_add.add(search);
    var tbl = Ti.UI.createTableView({
        allowsSelection: true,
        search: search,
        top: 93
    });
    tbl.addEventListener("click", function(e) {
        if (e.row.selected) {
            e.row.backgroundColor = "#fff";
            e.row.selected = 0;
        } else {
            e.row.backgroundColor = "#66bbb0";
            e.row.selected = 1;
        }
    });
    group_add.add(tbl);
    var callback_contacts = function(data) {
        var contacts = [];
        _.each(data.resource, function(element) {
            contacts.push({
                id: element.id,
                title: element.first_name + " " + element.last_name
            });
        });
        Ti.API.info(contacts);
        tbl.setData(contacts);
    };
    apiModule.getRecords("contact", null, token, callback_contacts);
    var callback_group = function(data) {
        var group_id = data.resource[0].id;
        save_relations(group_id);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;