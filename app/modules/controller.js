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

function(app, Player, UI, Analytics) {
    var Controller = {};

    Controller.Model = app.Backbone.Model.extend({

        initialize: function() {
            this.initPlayer();
        },

        initPlayer: function() {
            var context, showChrome;

            app.player = new Player.player({
                // debugEvents: true,
                // cover: false,
                scalable: true,
                endPage: true,
                controls: false,
                autoplay: false,
                target: '#player',
                preview: false,
                data: $.parseJSON( window.projectJSON ) || null,
                url: window.projectJSON ? null :
                    app.state.get("projectID") !== null ? app.metadata.api + "/items/" + app.state.get("projectID") :
                    "testproject.json",
                startFrame: app.state.get("frameID")
            });

            //initialize analytics
            app.analytics = new Analytics();


            
            try{

                app.showChrome = !window.frameElement || !window.frameElement.getAttribute("hidechrome");

            } catch ( err ){

                app.showChrome = false;
            
            }

            try{

                app.showEndPage = ( window == window.top ) || (window.frameElement && window.frameElement.getAttribute("endpage"));

            } catch ( err ){

                app.showEndpage = true;
            
            }

            //detect context
            if( window==window.top ){
                context = "web";
            } else if ( !app.showChrome ) {
                context = "homepage";
            } else {
                context = "embed";
            }

            app.analytics.setGlobals({
                projectId: app.player.project.get("id"),
                projectPageCount: app.player.project.sequences.at(0).frames.length,
                userId: app.metadata.userId,
                userName: app.metadata.userName,
                app: "player",
                context: context
            });

            app.analytics.trackEvent("zeega_view");





            if( window.projectJSON ) {
                this.onDataLoaded();
            } else {
                app.player.on('data_loaded', this.onDataLoaded, this);
            }
            app.player.on('frame_play', this.onFrameRender, this);
            app.player.on('sequence_enter', this.updateWindowTitle, this);
           
        },

        onDataLoaded: function() {
            /*
            render base layout
            the base layout contains the logic for the player skin (citations, ui, etc)
            */
            app.layout = new UI.Layout();
        },

        onFrameRender: function( info ) {
            // app.router.navigate( 'f/'+ info.id );
        },

        updateWindowTitle: function( info ) {
            var title = app.player.project.get("title") + " by " + app.player.project.get("authors");

            $('title').text( title );
        }

  });

    // Required, return the module for AMD compliance
    return Controller;
});