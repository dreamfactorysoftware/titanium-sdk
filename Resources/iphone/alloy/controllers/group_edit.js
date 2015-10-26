function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function callback_groupname(data) {
        tf1.value = data.name;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "group_edit";
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
    var group_edit = Ti.UI.createWindow({
        backgroundColor: "white"
    });
    var nav = Ti.UI.iOS.createNavigationWindow({
        window: group_edit
    });
    nav.open();
    var imageView = Ti.UI.createImageView({
        image: "df-logo.png",
        height: 20
    });
    group_edit.titleControl = imageView;
    var backBtn = Ti.UI.createButton({
        title: "Back"
    });
    group_edit.leftNavButton = backBtn;
    var doneBtn = Ti.UI.createButton({
        title: "Done"
    });
    group_edit.rightNavButton = doneBtn;
    var scrollView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true
    });
    group_edit.add(scrollView);
    group_edit.open();
    backBtn.addEventListener("click", function() {
        var arg = {
            group_id: group_id
        };
        Alloy.createController("group_show", arg);
    });
    doneBtn.addEventListener("click", function() {
        var params = "filter=contact_group_id%3D" + group_id;
        apiModule.deleteRecord("contact_group_relationship", params, token, function() {
            var selected = _.filter(tbl.data[0].rows, function(obj) {
                return 1 == obj.selected;
            });
            _.each(selected, function(element) {
                Ti.API.info(element);
                var params = {
                    data: {
                        contact_group_id: group_id,
                        contact_id: element.id
                    }
                };
                apiModule.setRecord("contact_group_relationship", params, token, null);
            });
            var group = {
                data: {
                    name: tf1.value
                }
            };
            apiModule.updateRecord("contact_group/" + group_id, group, token, null);
            var arg = {
                group_id: group_id
            };
            Alloy.createController("group_show", arg);
        });
    });
    var imageView = Ti.UI.createImageView({
        image: "df-logo.png",
        height: 20
    });
    group_edit.titleControl = imageView;
    var tf1 = Ti.UI.createTextField({
        color: "#336699",
        top: 15,
        hintText: "Group Name"
    });
    group_edit.add(tf1);
    var search = Titanium.UI.createSearchBar({
        barColor: "#f0f0f0",
        borderColor: "#f0f0f0",
        top: 50
    });
    group_edit.add(search);
    var tbl = Titanium.UI.createTableView({
        allowsSelection: true,
        search: search,
        top: 95
    });
    group_edit.add(tbl);
    tbl.addEventListener("click", function(e) {
        if (e.row.selected) {
            e.row.backgroundColor = "#fff";
            e.row.selected = 0;
        } else {
            e.row.backgroundColor = "#66bbb0";
            e.row.selected = 1;
        }
    });
    var callback_selectedcontacts = function(data) {
        var selected_contacts = [];
        _.each(data.resource, function(element) {
            selected_contacts.push(element.contact_id);
        });
        apiModule.getRecords("contact", null, token, function(data) {
            var contacts = [];
            _.each(data.resource, function(element) {
                contacts.push(selected_contacts.indexOf(element.id) > -1 ? {
                    id: element.id,
                    title: element.first_name + " " + element.last_name,
                    selected: 1,
                    backgroundColor: "#66bbb0"
                } : {
                    id: element.id,
                    title: element.first_name + " " + element.last_name,
                    selected: 0,
                    backgroundColor: "#fff"
                });
            });
            tbl.setData(contacts);
        });
    };
    var params = "?filter=contact_group_id%3D" + group_id + "&fields=contact_id";
    apiModule.getRecords("contact_group_relationship" + params, null, token, callback_selectedcontacts);
    apiModule.getRecords("contact_group/" + group_id, null, token, callback_groupname);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;