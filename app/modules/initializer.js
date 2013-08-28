/*

the controller model should remove any non-route code from router.js
*/

define([
    "app",
    // Libs
    "player/modules/player",

    "modules/ui",
    "analytics/analytics"

     // Plugins
],

function( app, Player, PlayerUI, Analytics ) {

    return app.Backbone.Model.extend({

        initialize: function() {
            this.initPlayer();
        },

        initPlayer: function() {
            var context, showChrome;

            app.player = new Player({
                // debugEvents: true,
                // cover: false,

                scalable: true,
                endPage: true,
                controls: false,
                autoplay: false, // for testing
                preloadRadius: 2,
                target: "#player",
                preview: false,
                data: $.parseJSON( window.projectJSON ) || null,
                url: window.projectJSON ? null :
                    app.state.get("projectID") !== null ? app.metadata.api + "/items/" + app.state.get("projectID") :
                    "testproject.json",
                startFrame: app.state.get("frameID")
            });

            if( window.projectJSON ) {
                this.onDataLoaded();
            } else {
                app.player.once('player:ready', this.onDataLoaded, this);
            }
            app.player.on('sequence_enter', this.updateWindowTitle, this);
           
        },

        onDataLoaded: function() {
            /*
            render base layout
            the base layout contains the logic for the player skin (citations, ui, etc)
            */
            this.setContextVariables();
            this.initAnalytics();
            app.layout = new PlayerUI();

        },

        setContextVariables: function() {
            try {
                app.showChrome = !window.frameElement || !window.frameElement.getAttribute("hidechrome");
            } catch ( err ) {
                app.showChrome = false;
            }

            try {
                app.showEndPage = ( window == window.top ) || ( window.frameElement && window.frameElement.getAttribute("endpage"));
            } catch ( err ) {
                app.showEndPage = true;
            }
        },

        initAnalytics: function() {
            var context;
                        //detect context
            if( window == window.top ) {
                context = "web";
            } else if ( !app.showChrome ) {
                context = "homepage";
            } else {
                context = "embed";
            }

            app.analytics = new Analytics();

            app.analytics.setGlobals({
                projectId: app.player.zeega.getCurrentProject().id,
                projectPageCount: app.player.zeega.getCurrentProject().pages.length,
                userId: app.metadata.userId,
                userName: app.metadata.userName,
                app: "player",
                context: context,
                authenticated: app.metadata.loggedIn
            });

            app.analytics.trackEvent("zeega_view");
        },

        updateWindowTitle: function( info ) {
            var title = app.player.project.get("title") + " by " + app.player.project.get("authors");

            $('title').text( title );
        }

  });

});