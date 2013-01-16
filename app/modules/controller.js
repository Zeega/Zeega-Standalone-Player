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
            var player = new Zeega.player({
                // window_fit: false,
                autoplay: false,
                target: '#player',
                url: app.api + app.state.get("projectID"),
                startFrame: app.state.get("frameID")
            });

            // outputs player events to the console
            // player.on('all', function(e, obj) { if(e!='media_timeupdate') console.log('    player event:',e,obj);});
            // listen for frame events to update the router
            player.on('data_loaded', this.onDataLoaded, this);
            player.on('frame_rendered', this.onFrameRender, this);
            player.on('sequence_enter', this.updateWindowTitle, this);
            app.player = player;
        },

        onDataLoaded: function( data ) {
                        /*
            render base layout
            the base layout contains the logic for the player skin (citations, ui, etc)
            */
            app.layout = new UI.Layout();
        },

        onFrameRender: function( info ) {
            app.router.navigate( app.state.get('projectID') +'/f/'+ info.id );
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