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
    "modules/endpage",
    "modules/pause"
],

function( app, Backbone, Loader, Controls, MenuBarBottom, MenuBarTop, EndPage, PauseView ) {

    var FADE_OUT_DELAY = 3000;

    return Backbone.Layout.extend({

        hasPlayed: false,
        el: "#main",

        initialize: function() {
            this.setWindowSize();

            app.player.on("pause", this.onPause, this );
            app.player.on("play", this.onPlay, this );

            this.loader = new Loader.View({ model: app.player });
            this.controls = new Controls.View({ model: app.player });
            this.bottomBar = new MenuBarBottom.View({ model: app.player });
            this.topBar = new MenuBarTop.View({ model: app.player });

            this.insertView("#overlays", this.loader );
            this.insertView("#overlays", this.controls );
            this.insertView("#overlays", this.bottomBar );
            this.insertView("#overlays", this.topBar );

            if( app.showEndPage ){
                this.endPage = new EndPage.View({ model: app.player });
                this.insertView("#overlays", this.endPage );
            }
            
            this.render();

            $( window ).resize(function() {
                this.onResize();
            }.bind(this));
        },

        afterRender: function() {
            app.state.set("baseRendered", true );
            // this.resetFadeOutTimer();
        },

        // sets the window size lazily so we don't have to do it elsewhere
        setWindowSize: function() {
            app.state.set("windowWidth", window.innerWidth );
            app.state.set("windowHeight", window.innerHeight );
        },

        events : {
            "mousemove": "onMouseMove",
            "resize": "onResize"
        },

        onResize: _.debounce( function() {
            this.setWindowSize();
        }, 500 ),

        onMouseMove: function( e ) {
            if ( this.hasPlayed ) {
                var pageX = e.pageX,
                    pageY = e.pageY;

                if ( pageY < 100 ) {
                    this.showMenubar();
                }
                else if ( pageY > app.state.get("windowHeight") - 100 ) {
                    this.showCitationbar();
                }
            }
        },

        fadeOutChrome: function() {
            this.topBar.fadeOut();
            this.bottomBar.fadeOut();
        },

        showMenubar: _.debounce(function() {
            this.topBar.fadeIn();
        }, 500, true ),

        showCitationbar: _.debounce(function() {
            this.bottomBar.fadeIn();
        }, 500, true ),

        onPause: function() {
            this.pause = new PauseView({ model: app.player });
            this.$("#overlays").prepend( this.pause.el );
            this.pause.render();
        },

        onPlay: function() {
            this.topBar.fadeOut();
            this.bottomBar.fadeOut();
            if ( this.pause ) {
                this.pause.remove();
            }
        }

    });
});