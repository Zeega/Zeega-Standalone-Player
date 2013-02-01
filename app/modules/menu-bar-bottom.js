define([
    "app",
    // Libs
    "backbone"
],

function(app, Backbone) {

    // Create a new module
    var Citations = {};

    // This will fetch the tutorial template and render it.
    Citations.View = Backbone.View.extend({
        
        visible : true,
        hover: false,
        playing: false,

        template: "menu-bar-bottom",

        className: "ZEEGA-player-citations",

        serialize: function() {
            if ( this.model.project ) {
                return this.model.project.toJSON();
            }
        },

        initialize: function() {
            /* update the arrow state whenever a frame is rendered */
            this.model.on("frame_rendered", this.updateCitations, this);
            this.model.on("data_loaded", this.render, this);
            this.model.on("play", this.onPlay, this );
            this.model.on("pause", this.onPause, this );
        },

        onPlay: function() {
            this.$("#project-play-pause i").addClass("pause-zcon").removeClass("play-zcon");
        },

        onPause: function() {
            this.$("#project-play-pause i").addClass("play-zcon").removeClass("pause-zcon");
            this.fadeIn();
        },

        updateCitations: function( info ) {
            var layersToCite = _.map( info.layers, function(layer){
                if( layer.attr.citation && layer.attr.archive ) return layer;
                return false;
            });

            this.$(".ZEEGA-citations-primary").empty();
            _.each( _.compact( layersToCite ), function(layer){
                var citation = new CitationView({ model: new Backbone.Model(layer) });
                this.$(".ZEEGA-citations-primary").append(citation.el);
                citation.render();
            }.bind( this ));
        },

        events: {
            "mouseenter": "onMouseenter",
            "mouseleave": "onMouseleave",
            "click #project-play-pause": "playpause"
        },

        fadeOut: function() {
            if(this.visible && !this.hover && app.player.state != "paused" ) {
                this.visible = false;
                this.$el.fadeOut();
            }
        },
     
        fadeIn: function() {
            if(!this.visible) {
                this.visible = true;
                this.$el.fadeIn();
            }
        },

        onMouseenter: function() {
            this.hover = true;
        },

        onMouseleave: function() {
            this.hover = false;
        },

        playpause: function() {
            if ( this.model.state == "paused") {
                this.model.play();
            } else {
                this.model.pause();
            }
            return false;
        }
    });

    var CitationView = Backbone.View.extend({
        tagName: "li",
        template: "citation",

        serialize: function() {
            return this.model.toJSON();
        },

        events: {
            "hover": "onHover"
        },

        onHover: function() {
            this.$("i").toggleClass("loaded");
        }
  
    });

    return Citations;
});