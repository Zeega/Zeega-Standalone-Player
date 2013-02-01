/*

  ui.js

  the ui layer or skin that sits over player and controls/reacts to it
*/

define([
    "app",

    // Libs
    "backbone",

    // Modules,
    "modules/loader",
    "modules/controls",
    "modules/menu-bar-bottom",
    "modules/menu-bar-top",
    "modules/pause"
],

function( app, Backbone, Loader, Controls, MenuBarBottom, MenuBarTop, PauseView ) {

    // Create a new module
    var UI = {};

    var FADE_OUT_DELAY = 3000;

    // This will fetch the tutorial template and render it.
    UI.Layout = Backbone.Layout.extend({
        
        el: "#main",

        initialize: function() {

            app.player.on("pause", this.onPause, this );
            app.player.on("play", this.onPlay, this );

            this.loader = new Loader.View({ model: app.player });
            this.controls = new Controls.View({ model: app.player });
            this.citations = new MenuBarBottom.View({ model: app.player });
            this.menuBar = new MenuBarTop.View({ model: app.player });

            this.insertView("#overlays", this.loader );
            this.insertView("#overlays", this.controls );
            this.insertView("#overlays", this.citations );
            this.insertView("#overlays", this.menuBar );
            this.render();
        },

        afterRender: function() {
            app.state.set("baseRendered", true );
            this.resetFadeOutTimer();
        },

        events : {
            "mousemove": "resetFadeOutTimer"
        },

        resetFadeOutTimer: function() {
            this.citations.fadeIn();
            this.menuBar.fadeIn();
            if ( this.timer ) {
                clearTimeout( this.timer );
            }
            this.timer = setTimeout(function(){
                this.citations.fadeOut();
                this.menuBar.fadeOut();
            }.bind( this ), FADE_OUT_DELAY);
        },

        onPause: function() {
            this.pause = new PauseView({ model: app.player });
            this.$("#overlays").prepend( this.pause.el );
            this.pause.render();
        },

        onPlay: function() {
            if ( this.pause ) {
                this.pause.remove();
            }
        }

    });

    // Required, return the module for AMD compliance
    return UI;
});