define([
    "app",
    "modules/citation.view",
    // Libs
    "backbone"
],

function( app, CitationView, Backbone ) {
    
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
                    this.model.zeega.projects.at(0).toJSON()
                );
            }
        },

        initialize: function() {
            /* update the arrow state whenever a frame is rendered */
            this.model.on("page:focus", this.updateCitations, this );
            // this.model.on("data_loaded", this.render, this);
            this.model.on("pause", this.fadeIn, this );

            this.model.on("endpage_enter", this.endPageEnter, this );
            this.model.on("endpage_exit", this.endPageExit, this );
        },

        afterRender: function(){
            if ( app.metadata.loggedIn ){
                this.$(".favorite").show();
            }
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

        incFavorites: function( inc ){
            this.model.project.set( "favorite_count", this.model.project.get("favorite_count") + inc );
            this.$(".zeega-favorite_count").html( this.getFavorites() );
        },

        toggleFavorite: function(){
            var url;
            this.$(".btnz").toggleClass("favorited");

            if(this.model.project.get("favorite")){
                url = "http://" + app.metadata.hostname + app.metadata.directory + "api/projects/" + this.model.project.id + "/unfavorite";
                this.model.project.set({ "favorite": false });
                this.incFavorites(-1);
                app.emit("unfavorite");


            } else {
                url = "http://" + app.metadata.hostname + app.metadata.directory + "api/projects/" + this.model.project.id + "/favorite";
                this.model.project.set({ "favorite": true });
                this.incFavorites(1);
                app.emit("favorite");
            }
            $.ajax({ url: url, type: 'POST', success: function(){  }  });

            return false;

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
        },

        updateSoundtrackCitation: function( soundtrack ) {
            this.$(".citation-soundtrack")
                .attr("href", soundtrack.get("attr").attribution_uri )
                .css({
                    background: "url("+ soundtrack.get("attr").thumbnail_url +")",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                })
                .show();
        },

        events: {
            "mouseenter": "onMouseenter",
            "mouseleave": "onMouseleave",
            "click #project-play-pause": "playpause",
            "click .ZEEGA-home": "startOver",
            "click .favorite-btnz": "toggleFavorite",
            "click .profile-link": "onProfile"
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