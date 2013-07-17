define([
    "app",
    "engine/modules/sequence.model"
    // Libs
     // Plugins
],

function( app, Sequence ) {

    return app.Backbone.Model.extend({

        defaults: {
            parent: {},
            project: false,
            remix: true,
            request: {},
            root: {}
        },

        url: function() {
            return "http:" + app.metadata.hostname + "api/projects/" + this.get("parent").id;
        },

        initialize: function() {
            this.fetch()
                .success(function() {
                    this.parse();
                }.bind( this ));
        },

        parse: function() {
            console.log("init remix mod", this)
            this.sequence = new Sequence();
        }

    });

});