define([
    // Application.
    "app",
    // Modules.
    "modules/controller"
],

function( app, Controller ) {
    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({

        routes: {
            "": "base",

            ":projectID": 'goToProject',
            ":projectID/frame/:frameID": 'goToProjectFrame',
            ":projectID/f/:frameID": 'goToProjectFrame',

            "project/:projectID" : 'goToProject',
            "p/:projectID" : 'goToProject',

            "project/:projectID/frame/:frameID": 'goToProjectFrame',
            "p/:projectID/f/:frameID": 'goToProjectFrame'
        },

        bootstrappedRoutes: {
            "": "base",
            "f/:frameID": 'goToFrame'
        },

        /*
        when no route is present.

        player could wait for user input or rely on bootstrapped data
        */
        base: function() {
            initialize();
        },

        goToProject: function( projectID ) {
            app.state.set("projectID",projectID);
            initialize();
        },

        goToProjectFrame: function( projectID, frameID ) {
            app.state.set({
                projectID: projectID,
                frameID: frameID
            });
            if(app.state.get("initialized")) {
                app.player.cueFrame(frameID);
            }
            initialize();
        },

        goToFrame: function( frameID ) {
            app.state.set({
                frameID: frameID
            });
            if(app.state.get("initialized")) {
                app.player.cueFrame( frameID );
            }
            initialize();
        }

    });

    /* create init fxn that can only run once per load */
    var init = function() {
        new Controller.Model();
        app.state.set("initialized", true );
    };
    var initialize = _.once( init );
    
    return Router;
});