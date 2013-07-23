define([
    // Libraries.
    "jquery",
    "lodash",
    "backbone",

    "modules/state",
    "engineVendor/spin",
    // Plugins.
    "plugins/backbone.layoutmanager"
],

function( $, _, Backbone, State, Spinner ) {
    
    var app = {
        // The root path to run the application.
        root: "/",
        metadata: $("meta[name=zeega]").data(),

      /*
        app.state stores information on the current state of the application
      */
        state: new State(),

        Backbone: Backbone,
        $: $,
        
        emit: function( event, args ) {
            // other things can be done here as well
            this.trigger( event, args );
        }
    };

    app.spinner = new Spinner({
            lines: 13, // The number of lines to draw
            length: 10, // The length of each line
            width: 4, // The line thickness
            radius: 30, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#FFF', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        });

    app.spin = function( el ) {
        var target = el || app.layout.el;

        app.spinner.spin( target );
    }

    app.spinStop = function() {
        app.spinner.stop();
    }

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    // events that trigger the save indicator on the editor interface
    Backbone.Model.prototype.initSaveEvents = function() { /* empty for player */ };
    Backbone.Model.prototype.put = function() {
        var args = [].slice.call( arguments ).concat([ { silent: true } ]);
        return this.set.apply( this, args );
    };


    Backbone.Layout.configure({
        // Allow LayoutManager to augment Backbone.View.prototype.
        manage: true,

        fetch: function( path ) {
            // Initialize done for use in async-mode
            var done;
            // Concatenate the file extension.
            path = path + ".html";
            // If cached, use the compiled template.
            if (JST[path]) {
                return JST[path];
            } else {
                // Put fetch into `async-mode`.
                done = this.async();
                // Seek out the template asynchronously.
                return $.ajax({ url: app.root + path }).then(function(contents) {
                    done(JST[path] = _.template(contents));
                });
            }
        }
    });
    
    // Mix Backbone.Events, modules, and layout management into the app object.
    return _.extend(app, {
        
    }, Backbone.Events);

});
