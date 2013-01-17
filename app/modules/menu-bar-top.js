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
        
        visible: true,
        hover: false,

        template: "menu-bar-top",

        className: "ZEEGA-player-menu-bar",

        serialize: function() {
            return this.model.data.toJSON();
        },

        initialize: function() {
            this.model.on("data_loaded", this.render, this);
            this.model.on("sequence_enter", this.onEnterSequence, this );
        },

        onEnterSequence: function( info ) {
            this.updateDescription( info );
        },

        updateDescription: function( info ) {
            /* update the sequence title in the menu bar */
            // var def = /Sequence ([0-9]*)/g.test(info.title);
            // var seqTitle = def ? "" : " - "+ info.title;
            // this.$(".sequence-description").text(seqTitle);
        },

        events: {
            "click #project-share": "share",
            "click #project-credits": "credits",
            "click #project-fullscreen-toggle": "toggleFullscreen",
            "mouseenter": "onMouseenter",
            "mouseleave": "onMouseleave"
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

            this.$("#project-fullscreen-toggle i")
                .removeClass("icon-resize-full")
                .addClass("icon-resize-small");
        },

        leaveFullscreen : function() {
            app.state.set("fullscreen", false );
            if ( document.exitFullscreen )        document.exitFullscreen();
            else if ( document.mozCancelFullScreen )    document.mozCancelFullScreen();
            else if ( document.webkitCancelFullScreen )   document.webkitCancelFullScreen();

            this.$("#project-fullscreen-toggle i")
                .addClass("icon-resize-full")
                .removeClass("icon-resize-small");
        },

        fadeOut: function() {
            if( this.visible && !this.hover && app.player.status != "paused") {
                this.visible = false;
                this.$el.fadeOut();
            }
        },
     
        fadeIn: function() {
            if ( !this.visible ) {
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

    return MenuBar;
});