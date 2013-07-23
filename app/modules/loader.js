define([
    "app",
    // Libs
    "backbone",
    "engineVendor/spin"
],

function( app, Backbone, Spinner ) {
    var Loader = {};

    Loader.View = Backbone.View.extend({

        MIN_LOAD_TIME: 2000,
        loadTimer: null,
        playerCanplay: false,
        isReady: false,
        /* variables keeping track of generic layer states */
        layerCount : 0,
        layersReady : 0,
        spinner: null,

        className: "ZEEGA-loader-overlay",
        template: "app/templates/loader",

        initialize: function() {
            if( window != window.top ){
                this.MIN_LOAD_TIME =0;
            }

            this.model.once("player:canplay", this.onPlayerCanplay, this );
        },

        serialize: function() {
            if ( this.model.zeega.getCurrentProject() ) {
                return _.extend({},
                    app.metadata,
                    this.model.zeega.getCurrentProject().toJSON()
                );
            }
        },

        afterRender: function() {
            app.spin( this.el );

            this.loadTimer = setTimeout(function() {
                clearTimeout( this.loadTimer );
                this.loadTimer = "done";
                if ( this.playerCanplay ) {
                    this.onCanPlay();
                }
            }.bind( this ), this.MIN_LOAD_TIME );
        },

        onPlayerCanplay: function() {
            this.playerCanplay = true;
            if ( this.loadTimer == "done" ) {
                this.onCanPlay();
            }
        },

        onCanPlay: _.once(function() {
            app.spinStop();
            this.$el.fadeOut(function() {
                this.remove();
            }.bind( this ));
            app.layout.hasPlayed = true;
            this.model.play();
        })

  });

  // Required, return the module for AMD compliance
  return Loader;

});
