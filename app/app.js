define([
    // Libraries.
    "jquery",
    "lodash",
    "backbone",

    "modules/state",
    // Plugins.
    "plugins/backbone.layoutmanager"
],

function( $, _, Backbone, State ) {
    
    var meta = $("meta[name=zeega]");
    // Provide a global location to place configuration settings and module
    // creation.
    var app = {
        // The root path to run the application.
        root: "/",

        parserPath: "app/zeega-parser2/",

        // the path of the zeega api
        // only required for dynamically loaded zeegas
        api: "http:" + meta.data("hostname") + meta.data("directory") + "api/",
        hostname: meta.data("hostname") || "",
        directory: meta.data("directory") || "",
        userThumbnail: meta.data("userThumbnail"),
        views: meta.data("views"),
      /*
        app.state stores information on the current state of the application
      */
        state: new State()
    };

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    Backbone.LayoutManager.configure({
        // Allow LayoutManager to augment Backbone.View.prototype.
        manage: true,

        paths: {
            layout: "app/templates/layouts/",
            template: "app/templates/"
        },

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
        // Create a custom object with a nested Views object.
        module: function( additionalProps ) {
            return _.extend({ Views: {} }, additionalProps);
        },

        // Helper for using layouts.
        useLayout: function( name, options ) {
            // If already using this Layout, then don't re-inject into the DOM.
            if (this.layout && this.layout.options.template === name) {
                return this.layout;
            }

            // If a layout already exists, remove it from the DOM.
            if (this.layout) {
                this.layout.remove();
            }

            // Create a new Layout with options.
            var layout = new Backbone.Layout(_.extend({
                template: name,
                className: "layout " + name,
                id: "layout"
            }, options));

            // Insert into the DOM.
            $("#main").empty().append(layout.el);

            // Render the layout.
            layout.render();

            // Cache the refererence.
            this.layout = layout;

            // Return the reference, for chainability.
            return layout;
        }
    }, Backbone.Events);

});
