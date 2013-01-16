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

        template: "citations",

        className: "ZEEGA-player-citations",

        serialize: function() {
            return this.model.toJSON();
        },

        initialize: function() {
            /* update the arrow state whenever a frame is rendered */
            this.model.on("frame_rendered", this.updateCitations, this);
            this.model.on("data_loaded", this.render, this);
            this.model.on("pause", this.fadeIn, this );
        },

        updateCitations: function( info ) {
            var layersToCite = _.map( info.layers, function(layer){
                if(layer.citation) return layer;
                return false;
            });

            this.$(".ZEEGA-citations-primary").empty();
            _.each( _.compact(layersToCite), function(layer){
                var citation = new CitationView({ model: new Backbone.Model(layer) });
                this.$(".ZEEGA-citations-primary").append(citation.el);
                citation.render();
            }.bind( this ));
        },

        events: {
          "mouseenter": "onMouseenter",
          "mouseleave": "onMouseleave"
        },

        fadeOut: function() {
            if(this.visible && !this.hover && app.player.status != "paused" ) {
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

        onHover: function()
        {
            this.$("i").toggleClass("loaded");
        }
  
    });

    return Citations;
});