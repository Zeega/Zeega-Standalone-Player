define([
    "app",
    // Libs
    "backbone"
],

function(app, Backbone) {

    // Create a new module
    var MenuBar = {};

    // This will fetch the tutorial template and render it.
    MenuBar.View = Backbone.View.extend({
        
        visible: false,
        hover: false,
        sticky: false,

        template: "menu-bar-top",

        className: "ZEEGA-player-menu-bar",


        //TODO move views, user thumbnail to project data.  directory, hostname from app.
        serialize: function() {
            var tumblr_share,
                tumblr_caption,
                views;

            tumblr_caption = "<p><a href='http:" + app.hostname + this.model.project.get("item_id") + "'><strong>Play&nbsp;► " +
                            this.model.project.get("title") + "</strong></a></p><p>A Zeega by&nbsp;<a href='http:" +
                            app.hostname + "profile/" + this.model.project.get("user_id") + "'>" + this.model.project.get("authors") + "</a></p>";

            tumblr_share = "source=" + encodeURIComponent( this.model.project.get("cover_image") ) +
                            "&caption=" + encodeURIComponent( tumblr_caption ) +
                            "&click_thru=http:"+ encodeURIComponent( app.hostname ) + this.model.project.get("item_id");

            views = app.views == 1 ? app.views + " view" : app.views + " views";
            
            if ( this.model.project ) {
                return _.extend({
                        directory: app.directory,
                        hostname: app.hostname,
                        user_thumbnail: app.userThumbnail,
                        views: views,
                        tumblr_share: tumblr_share
                    },
                    this.model.project.toJSON()
                    );
            }
        },

        initialize: function() {
            this.model.on("data_loaded", this.render, this);
            this.model.on("pause", this.fadeIn, this );
            this.model.on("endpage_enter", this.endPageEnter, this );
            this.model.on("endpage_exit", this.endPageExit, this );
        },

        endPageEnter: function() {
            this.sticky = true;
            this.show();

            this.renderExplore();
        },

        endPageExit: function() {
            this.sticky = false;
            this.fadeOut( 0 );
            this.unrenderExplore();
        },

        renderExplore: function() {
            $("#overlays").append("<a href='http://www.zeega.com/' class='btnz explore-zeega'>Explore More Zeegas</a>");
        },

        unrenderExplore: function() {
            $(".explore-zeega").remove();
        },

        events: {
            "click #project-share": "share",
            "click #project-credits": "credits",
            "click #project-fullscreen-toggle": "toggleFullscreen",
            "mouseenter": "onMouseenter",
            "mouseleave": "onMouseleave",
            "click .project-title": "home"
        },

        share: function() {
            this.model.pause();
            this.$(".slide-menu").toggle();
            return false;
        },

        credits: function() {
            return false;
        },

        toggleFullscreen: function() {
            console.log("toggle fullscreen")
            if ( app.state.get("fullscreen") ) {
                this.leaveFullscreen();
            } else {
                this.goFullscreen();
            }
            return false;
        },

        goFullscreen : function() {
            app.state.set("fullscreen", true );
            docElm = document.getElementById("main");
              
            if ( docElm.requestFullscreen ) docElm.requestFullscreen();
            else if ( docElm.mozRequestFullScreen ) docElm.mozRequestFullScreen();
            else if ( docElm.webkitRequestFullScreen ) docElm.webkitRequestFullScreen();

            this.$("#project-fullscreen-toggle").text("exit fullscreen");
        },

        leaveFullscreen : function() {
            app.state.set("fullscreen", false );
            if ( document.exitFullscreen )        document.exitFullscreen();
            else if ( document.mozCancelFullScreen )    document.mozCancelFullScreen();
            else if ( document.webkitCancelFullScreen )   document.webkitCancelFullScreen();

            this.$("#project-fullscreen-toggle").text("fullscreen");
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

        home: function() {
            this.model.cueFrame( this.model.get("startFrame") );
            
            return false;
        }

    });

    return MenuBar;
});