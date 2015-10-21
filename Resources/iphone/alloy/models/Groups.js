var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        URL: "http://localhost:8081/api/v2/db/_table/contact_group",
        adapter: {
            type: "restapi",
            collection_name: "groups",
            idAttribute: "id"
        },
        headers: {
            "Content-type": "application/json; charset=utf-8",
            "X-DreamFactory-API-Key": "055e6ad5dbfb74620853ae873e848e83dbfa0fe8ed1e89f7bdaa1c9bfbf5860d",
            "X-DreamFactory-Session-Token": token = Ti.App.Properties.getString("token")
        },
        parentNode: function(data) {
            var entries = [];
            Ti.API.info(data);
            var resource = data.resource;
            var entries = [];
            _.each(resource, function(_entry) {
                var entry = {};
                entry.id = _entry.id;
                entry.name = _entry.name;
                entries.push(entry);
            });
            Ti.API.info(entries);
            return entries;
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

model = Alloy.M("groups", exports.definition, []);

collection = Alloy.C("groups", exports.definition, model);

exports.Model = model;

exports.Collection = collection;