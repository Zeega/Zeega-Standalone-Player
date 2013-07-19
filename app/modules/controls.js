define([
    "app",
    // Libs
    "backbone"
],

function(app, Backbone) {
    var Controls = {};

    Controls.View = Backbone.View.extend({
        
        template: "app/templates/controls",

        className: "ZEEGA-player-controls",

        initialize: function() {
            this.model.on("page:play", this.updateArrowState, this);
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
            this.model.cuePrev();
            return false;
        },

        updateArrowState: function( page ) {
            var next = page.getNextPage(),
                prev = page.getPrevPage();

            if( next ) this.enableArrow("next");
            else this.disableArrow("next");
            
            if ( prev ) this.enableArrow("prev");
            else this.disableArrow("prev")
        },

        enableArrow: function(className) {
            this.$("."+ className +".disabled").removeClass("disabled");
        },

        disableArrow: function(className) {
            this.$("."+ className).addClass("disabled");
        }
    });

    return Controls;
});