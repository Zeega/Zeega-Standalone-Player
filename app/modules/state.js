define([
    "app",
    // Libs
    "backbone"
],

function( app, Backbone ) {

    // This will fetch the tutorial template and render it.
    return Backbone.Model.extend({
        defaults: {
            baseRendered: false,
            firstVisit: true,
            fullscreen: false,
            initialized: false,
            projectID: null,
            frameID: null
        }
    });

});