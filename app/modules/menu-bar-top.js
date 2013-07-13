define([
    "app",
    // Libs
    "backbone"
],

function(app, Backbone) {
    var MenuBar = {};

    MenuBar.View = Backbone.View.extend({
        
        visible: true,
        hover: false,
        sticky: false,

        template: "app/templates/menu-bar-top",

        className: "ZEEGA-player-menu-bar",

        serialize: function() {

            var showChrome;

            try{

                showChrome =  !window.frameElement || !window.frameElement.getAttribute("hidechrome");

            } catch ( err ){

                showChrome = false;
            
            }


            if ( this.model.project ) {
                return _.extend({
                        show_chrome: showChrome,
                        share_links: this.getShareLinks(),
                        path: "http:" + app.metadata.hostname + app.metadata.directory
                    },
                    this.model.project.toJSON()
                );
            }
        },

         getShareLinks: function() {
            var html,
                links = {},
                webRoot = "http:" + app.metadata.hostname + app.metadata.directory;
                

            if( !_.isUndefined(this.model.project.get("title"))){
                title = this.model.project.get("title");
            } else {
                title = "";
            }
            

            html = "<p>" + title + "</p>" +
                "<p><a href='" + webRoot + this.model.project.get("id") + "'>" +
                "<strong>►&nbsp;Play&nbsp;Zeega&nbsp;►</strong></a>" +
                "</p><p>by&nbsp;<a href='" + webRoot + "profile/" + this.model.project.get("user_id") + "'>" + this.model.project.get("authors") + "</a></p>";

            links.tumblr = "http://www.tumblr.com/share/photo?source=" + encodeURIComponent( this.model.project.get("cover_image") ) +
                "&caption=" + encodeURIComponent( html ) +
                "&click_thru="+ encodeURIComponent( webRoot ) + this.model.project.get("id");

            links.reddit = "http://www.reddit.com/submit?url=" + encodeURIComponent( webRoot ) + this.model.project.get("id") +
                "&title=" + encodeURIComponent( title );

            links.twitter = "https://twitter.com/intent/tweet?original_referer=" + encodeURIComponent( webRoot ) + this.model.project.get("id") +
                "&text=" + encodeURIComponent( title  + " made w/ @zeega") +
                "&url=" + encodeURIComponent( webRoot ) + this.model.project.get("id");

            links.facebook = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent( webRoot ) + this.model.project.get("id");

            return links;
        },

        initialize: function() {
            this.model.on("data_loaded", this.render, this);
            this.model.on("pause", this.fadeIn, this );
            this.model.on("endpage_enter", this.endPageEnter, this );
            this.model.on("endpage_exit", this.endPageExit, this );
            this.model.on("sequence_enter", this.onSequenceEnter, this);
        },

        afterRender: function(){

            if( app.metadata.loggedIn ){
                this.$(".btnz-join").hide();
            }
        },
        onSequenceEnter: function(){
            var soundtrack = this.model.getSoundtrack();
            if ( soundtrack ) {
                this.$(".ZEEGA-sound-state").show();
            }
        },
        endPageEnter: function() {
            this.sticky = true;
            this.show();
        },

        endPageExit: function() {
            this.sticky = false;
            this.fadeOut( 0 );
        },

        events: {
            "click #project-fullscreen-toggle": "toggleFullscreen",
            "mouseenter": "onMouseenter",
            "mouseleave": "onMouseleave",
            "click .project-title": "startOver",
            "click .ZEEGA-sound-state": "toggleMute",
            "click .share-network a": "onShare",
            "click .ZEEGA-tab": "onHome"
        },

        toggleMute: function(){
            var soundtrack = this.model.getSoundtrack();
            if ( soundtrack ){
                if( this.$(".ZEEGA-sound-state").hasClass("muted") ){
                    this.$(".ZEEGA-sound-state").removeClass("muted");
                    soundtrack.visual.onPlay();
                    app.emit("mute_toggle", { state: "unmuted" });
                } else {
                    this.$(".ZEEGA-sound-state").addClass("muted");
                    soundtrack.visual.onPause();
                    app.emit("mute_toggle", { state: "muted" });
                }
            }
            return false;
        },

        toggleFullscreen: function() {
            if ( app.state.get("fullscreen") ) {
                this.leaveFullscreen();
                app.emit("fullscreen_toggle", { state: "noFullscreen" });
            } else {
                this.goFullscreen();
                app.emit("fullscreen_toggle", { state: "fullscreen" });
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
            if( this.visible && this.sticky === false ) {
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

        startOver: function() {
            this.model.cueFrame( this.model.get("startFrame") );
            app.emit("start_over", {source: "title"});
            return false;
        },

        onShare: function( event ){
            app.emit( "share", {
                "type": event.currentTarget.name
            });
        },

        onHome: function( ){
            app.emit("to_home");
        }

    });

    return MenuBar;
});