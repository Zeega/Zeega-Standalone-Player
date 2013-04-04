define([
    "app",
    // Libs
    "backbone"
],

function(app, Backbone) {

    // Create a new module
    var Controls = {};

    // This will fetch the tutorial template and render it.
    Controls.View = Backbone.View.extend({
        
        template: "controls",

        className: "ZEEGA-player-controls",

        initialize: function() {
            /* update the arrow state whenever a frame is rendered */
            this.model.on("frame_play", this.updateArrowState, this);
        },

        events: {
            "click .next": "next",
            "click .prev": "prev"
        },

        next: function() {
            this.model.cueNext();
            return false;
        },

        prev: function() {
            this.model.cueBack();
            return false;
        },

        updateArrowState: function( info ) {

            if( this.model.status.get("frameHistory").length > 1 ){
                this.activateArrow("prev");
            } else {
                this.disableArrow("prev");
            }


            if( info._connections == "r" || info._connections == "lr" ){
                this.activateArrow("next");
            } else {
                this.disableArrow("next");
            }
        },

        activateArrow: function(className) {
            this.$("."+ className +".disabled").removeClass("disabled");
        },

        disableArrow: function(className) {
            this.$("."+ className).addClass("disabled");
        }
    });

    return Controls;
});