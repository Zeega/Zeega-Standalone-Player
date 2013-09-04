define([
    "app",
    // Libs
    "backbone",
    "common/libs/spin",
    "common/libs/imagesloaded"
],

function( app, Backbone, Spinner ) {
    var Loader = {};

    Loader.View = Backbone.View.extend({

        MIN_LOAD_TIME: 2000,
        loadTimer: null,
        playerCanplay: false,
        isReady: false,

        className: "ZEEGA-loader-overlay",
        template: "app/templates/loader",

        initialize: function() {
            if( window != window.top ){
                this.MIN_LOAD_TIME =0;
            }
            if ( this.model.ready ) {
                this.onPlayerCanplay();
            } else {
                this.model.once("player:canplay", this.onPlayerCanplay, this );
            }
        },

        serialize: function() {
            if ( this.model.zeega.getCurrentProject() ) {
                var p = this.model.zeega.getCurrentProject();
                var r = p.get("remix");

                return _.extend({
                        token_class: r.remix && r.parent.id == r.root.id ? "two-up":
                                        r.remix ? "three-up" : ""
                    },
                    app.metadata,
                    p.toJSON()
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

            this.$(".bg-preload")
                .imagesLoaded()
                .done(function() {
                    this.$(".ZEEGA-loader-bg").fadeIn("slow");
                }.bind(this));
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
            app.trigger("loader:complete");
        })

  });

  // Required, return the module for AMD compliance
  return Loader;

});
