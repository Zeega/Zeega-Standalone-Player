define([
    "app",
    "remixer/remix-project.model"
    // Libs
     // Plugins
],

function( app, RemixProjectModel) {

    return app.Backbone.Collection.extend({

        model: RemixProjectModel,

        initialize: function() {

        }

  });

});