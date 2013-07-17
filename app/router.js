define([
    // Application.
    "app",
    // Modules.
    "modules/initializer"
],

function( app, Initializer ) {
    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({

        routes: {
            "": "base",
            "*path": "base"
        },

        initialize: function() {
            new Initializer();
            app.state.set("initialized", true );
        },

        base: function() {}
    });

    return Router;
});