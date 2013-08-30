define([
    // Libraries.
    "jquery",
    "lodash",
    "backbone",

    "modules/state",
    "common/_app.common",
    // Plugins.
    "plugins/backbone.layoutmanager"
],

function( $, _, Backbone, State, _App ) {
    
    var app = {
        // The root path to run the application.
        root: "/",

        isEmbed: function() {
            var isEmbed;

            try {
                isEmbed = window.frameElement !== null;
            } catch ( err ) {
                isEmbed = false;
            }

            return isEmbed;
        },

        hasEndpage: function() {
            var hasEndpage;

            try {
                hasEndpage= ( window == window.top ) || ( window.frameElement && window.frameElement.getAttribute("endpage"));
            } catch ( err ) {
                hasEndpage = true;
            }

            return hasEndpage;
        },

      /*
        app.state stores information on the current state of the application
      */
        state: new State(),

        Backbone: Backbone,
        $: $

    };

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
            var done;

            path = path + ".html";

            if (JST[path]) {
                return JST[path];
            } else {
                done = this.async();

                return $.ajax({ url: app.root + path }).then(function(contents) {
                    done(JST[path] = _.template(contents));
                });
            }
        }
    });
    
    return _.extend(app, _App, Backbone.Events);
});
