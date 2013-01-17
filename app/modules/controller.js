/*

the controller model should remove any non-route code from router.js
*/

define([
    "app",
    // Libs
    "backbone",

    "modules/ui",

     // Plugins
    'zeegaplayer'
],

function(app, Backbone, UI) {

    // Create a new module
    var Controller = {};

    // Does this need to be a model?? why not right?
    Controller.Model = Backbone.Model.extend({

        initialize: function() {
            this.initPlayer();
        },

        initPlayer: function() {
            app.player = new Zeega.player({
                // window_fit: false,
                autoplay: false,
                target: '#player',
                //data: $.parseJSON( window.projectJSON ) || null,
                url: "http://dev.zeega.org/joseph/web/api/projects/4458",
                //url: window.projectJSON ? null : app.api + "/items/" + app.state.get("projectID"),
                startFrame: app.state.get("frameID")
            });
            // outputs player events to the console
            // player.on('all', function(e, obj) { if(e!='media_timeupdate') console.log('    player event:',e,obj);});
            // listen for frame events to update the router
            if( window.projectJSON ) {
                this.onDataLoaded();
            } else {
                app.player.on('data_loaded', this.onDataLoaded, this);
            }
            app.player.on('frame_rendered', this.onFrameRender, this);
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
            app.router.navigate( 'f/'+ info.id );
        },

        updateWindowTitle: function( info ) {
            var rDefaultText = /^Sequence ([0-9]*)/g.test( info.title ),
                seqTitle = rDefaultText ? '' : ' - '+ info.title,
                projectTitle = _.isUndefined( app.player.get("title") ) ? "Untitled" : app.player.get("title");

            $('title').text( projectTitle + seqTitle );
        }

  });

    // Required, return the module for AMD compliance
    return Controller;
});