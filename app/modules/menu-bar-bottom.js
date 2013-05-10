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
        
        timer: null,
        visible: true,
        sticky: false,
        hover: false,
        playing: false,

        template: "menu-bar-bottom",

        className: "ZEEGA-player-citations",

        serialize: function() {
            if ( this.model.project ) {
                return _.extend({},
                    app.metadata,
                    this.model.project.toJSON()
                );
            }
        },

        initialize: function() {
            /* update the arrow state whenever a frame is rendered */
            this.model.on("frame_play", this.updateCitations, this );
            this.model.on("data_loaded", this.render, this);
            this.model.on("pause", this.fadeIn, this );

            this.model.on("endpage_enter", this.endPageEnter, this );
            this.model.on("endpage_exit", this.endPageExit, this );
        },

        endPageEnter: function() {
            this.sticky = true;
            this.$(".citations").hide();
            this.$(".ZEEGA-home").show();
            this.show();
        },

        endPageExit: function() {
            this.sticky = false;
            this.$(".ZEEGA-home").hide();
            this.$(".citations").show();
            this.fadeOut( 0 );
        },

        updateCitations: function( info ) {
            var layersToCite = _.filter( info.layers, function( layer ) {
                return _.contains(["Audio", "Image", "Video"], layer.type )
            });

            this.$(".citations ul").empty();
            _.each( layersToCite, function(layer){
                var citation = new CitationView({
                    parent: this,
                    model: new Backbone.Model(layer)
                });

                this.$(".citations ul").append(citation.el);
                citation.render();
            }.bind( this ));
        },

        events: {
            "mouseenter": "onMouseenter",
            "mouseleave": "onMouseleave",
            "click #project-play-pause": "playpause",
            "click .ZEEGA-home": "home"
        },

        fadeOut: function( stay ) {
            if( this.visible && this.sticky == false ) {
                var fadeOutAfter = stay || 2000;

                if ( this.timer ) {
                    clearTimeout( this.timer );
                }
                this.timer = setTimeout(function(){
                    if ( !this.hover && app.player.state != "paused" ) {
                        this.visible = false;
                        this.$el.fadeOut();
                    }
                }.bind( this ), fadeOutAfter);
                
            }
        },

        fadeIn: function( stay ) {
            if( !this.visible ) {
                this.show();
                this.fadeOut( stay );
            }
        },

        show: function() {
            this.visible = true;
            if ( this.timer ) {
                clearTimeout( this.timer );
            }
            this.$el.fadeIn();
        },

        onMouseenter: function() {
            this.hover = true;
        },

        onMouseleave: function() {
            this.hover = false;
            this.fadeOut();
        },

        playpause: function() {
            if ( this.model.state == "paused") {
                this.model.play();
            } else {
                this.model.pause();
            }
            return false;
        },

        home: function() {
            
            this.model.status.set("frameHistory",[]);
            this.model.cueFrame( this.model.get("startFrame") );
            
            return false;
        }
    });

    var CitationView = Backbone.View.extend({
        tagName: "li",
        template: "citation",

        serialize: function() {
            var iconType;

            switch( this.model.get("type") ) {
                case "Image":
                    iconType = "picture";
                    break;
                case "Audio":
                    iconType = "film";
                    break;
                case "Video":
                    iconType = "volume-up";
                    break;
            }

            return _.extend(
                { iconType: iconType },
                this.model.toJSON()
            );
        },

        events: {
            "mouseenter": "onMouseEnter",
            "mouseleave": "onMouseLeave"
        },

        onMouseEnter: function() {
            var title = this.model.get("attr").title != "" ? this.model.get("attr").title : "[untitled]";

            this.options.parent.$(".citation-title").text( title );
        },

        onMouseLeave: function() {
            this.options.parent.$(".citation-title").empty();;
        }
  
    });

    return Citations;
});