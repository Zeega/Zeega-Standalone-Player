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
    "modules/menu-bar-top"
],

function( app, Backbone, Loader, Controls, MenuBarBottom, MenuBarTop ) {

    // Create a new module
    var UI = {};

    var FADE_OUT_DELAY = 3000;

    // This will fetch the tutorial template and render it.
    UI.Layout = Backbone.Layout.extend({
        
        el: "#main",

        initialize: function() {

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
        }

    });

    // Required, return the module for AMD compliance
    return UI;
});