define([
    "app",
    "remixer/remix.collection"
    // Libs
     // Plugins
],

function( app, RemixCollection ) {

    return app.Backbone.Model.extend({

        remixCollection: null,

        initialize: function() {
            this.remixCollection = new RemixCollection();
        },

        add: function( remixData ) {
            this.remixCollection.add( remixData );
        }

  });

});