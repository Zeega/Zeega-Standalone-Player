define([
    "app",
    // Libs
    "backbone",
    "spin"
],

function( app, Backbone, Spinner ) {

    // Create a new module
    var Loader = {};

    // This will fetch the tutorial template and render it.
    Loader.View = Backbone.View.extend({

        MIN_LOAD_TIME: 3000,
        loadTimer: null,
        isReady: false,
        /* variables keeping track of generic layer states */
        layerCount : 0,
        layersReady : 0,
        spinner: null,

        className: "ZEEGA-loader-overlay",
        template: "loader",

        initialize: function() {
            this.model.on("layer_loading", this.onLayerLoading, this );
            this.model.on("layer_ready", this.onLayerReady, this );
        },

        serialize: function() {
            if ( this.model.project ) {
                return _.extend({},
                    app.metadata,
                    this.model.project.toJSON()
                );
            }
        },

        afterRender: function() {
            var opts = {
                lines: 13, // The number of lines to draw
                length: 10, // The length of each line
                width: 4, // The line thickness
                radius: 30, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#FFF', // #rgb or #rrggbb
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto' // Left position relative to parent in px
            };
            this.spinner = new Spinner(opts).spin( this.$el[0] );

            this.loadTimer = setTimeout(function() {
                clearTimeout( this.loadTimer );
                this.loadTimer = "done";
                if ( this.loadTimer == "done" && this.isReady ) {
                    this.onCanPlay();
                }
            }.bind( this ), this.MIN_LOAD_TIME );
        },

        onLayerLoading: function( layer ) {
            this.layerCount++;

            if( _.contains(["Audio", "Image", "Video"], layer.type) ) {
                var item, itemType;

                itemType = layer.attr.archive || layer.type;
                item = "<li><i class='zitem-" + itemType.toLowerCase() +" zitem-30' data-id='" + layer.id + "'></i></li>";
                this.$(".ZEEGA-loading-layers").append( item );
            }
        },

        onLayerReady: function(layer) {
            this.layersReady++;

            if (this.layersReady == this.layerCount) {
                this.isReady =  true;
                if ( this.loadTimer == "done" && this.isReady ) {
                    this.onCanPlay();
                }
            }
        },

        onCanPlay: _.once(function() {
            
            this.spinner.stop();
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
