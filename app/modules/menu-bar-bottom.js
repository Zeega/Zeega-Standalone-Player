define([
    "app",
    "modules/citation.view",
    "modules/remix-heads.collection",
    // Libs
    "backbone"
],

function( app, CitationView, RemixHeadsCollection, Backbone ) {
    
    return Backbone.View.extend({
        
        timer: null,
        visible: true,
        sticky: false,
        hover: false,
        playing: false,

        template: "app/templates/menu-bar-bottom",

        className: "ZEEGA-player-citations",

        serialize: function() {
            if ( this.model.zeega ) {
                return _.extend({
                    path: "http:" + app.metadata.hostname + app.metadata.directory,
                    favorites: this.getFavorites()
                },
                    app.metadata,
                    this.model.zeega.getCurrentProject().toJSON()
                );
            }
        },

        initialize: function() {
            this.model.on("page:focus soundtrack:ready", this.updateCitations, this );
            this.model.on("pause", this.fadeIn, this );

            this.model.on("endpage_enter", this.endPageEnter, this );
            this.model.on("endpage_exit", this.endPageExit, this );

            this.model.on("change:currentProject", this.render, this );
        },

        getFavorites: function(){
            var count = this.model.zeega.projects.at(0).get("favorite_count"),
                html = "";

            if ( count == 1){
                html = "♥ " + count + " favorite";
            } else if ( count > 1 ){
                html = "♥ " + count + " favorites";
            }

            return html;
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

        updateCitations: function( page ) {
            var soundtrack = this.model.zeega.getSoundtrack();

            if ( soundtrack ) this.updateSoundtrackCitation( soundtrack );

            if ( page && page.layers ) {
                this.$(".citations ul").empty();
                page.layers.each(function( layer ) {
                    if ( _.contains(["Image"], layer.get("type")) ) {
                        var citation = new CitationView({
                            parent: this,
                            model: layer
                        });

                        this.$(".citations ul").append(citation.el);
                        citation.render();
                    }
                }, this );
            }
        },

        updateSoundtrackCitation: function( soundtrack ) {
            this.$(".citation-soundtrack")
                .css({
                    background: "url("+ soundtrack.get("attr").thumbnail_url +")",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                })
                .show();

            this.$(".citation-soundtrack .citation-trackback")
                .attr("href", soundtrack.get("attr").attribution_uri )
                .attr("target", "blank");
        },

        events: {
            "mouseenter": "onMouseenter",
            "mouseleave": "onMouseleave",
            "click #project-play-pause": "playpause",
            "click .ZEEGA-home": "startOver",
            "click .favorite-btnz": "toggleFavorite",
            "click .profile-link": "onProfile",
            "click .play-pause": "toggleMute"
        },

        toggleMute: function(){
            var soundtrack = this.model.zeega.getSoundtrack();

            if ( soundtrack.visual.getAudio().paused ) {
                this.$(".pp-btn").addClass("pause");
                soundtrack.play();
                this.model.emit("mute_toggle", { state: "unmuted" });
            } else {
                this.$(".pp-btn").removeClass("pause");
                soundtrack.pause();
                this.model.emit("mute_toggle", { state: "muted" });
            }

            return false;
        },

        fadeOut: function( stay ) {
            if( this.visible && this.sticky === false ) {
                var fadeOutAfter = ( stay === 0 ) ? 0 : stay ? stay : 2000;

                if ( this.timer ) {
                    clearTimeout( this.timer );
                }
                this.timer = setTimeout(function(){
                    if ( !this.hover && app.player.state != "paused" ) {
                        this.visible = false;
                        this.$el.animate({ bottom: ( -1 - this.$(".ZEEGA-chrome-metablock").height() ) + "px" }, 500 );
                        // this.$(".ZEEGA-chrome-metablock").hide("blind",{direction:"vertical"},500);
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
            this.$el.animate({ bottom: 0 }, 500 );
            // this.$(".ZEEGA-chrome-metablock").show("blind",{direction:"vertical"},500);
        },

        onMouseenter: function() {
            this.hover = true;
        },

        onMouseleave: function() {
            this.hover = false;
            this.fadeOut();
        },

        onProfile: function(){
            app.emit("to_profile");
        },

        playpause: function() {
            if ( this.model.state == "paused") {
                this.model.play();
            } else {
                this.model.pause();
            }

            return false;
        },

        startOver: function() {
            this.model.cuePage( this.model.zeega.getFirstPage() );
            app.emit("start_over", {source: "button"});

            return false;
        }
    });

});