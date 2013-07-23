define([
    "app",
    // Libs
    "backbone"
],

function(app, Backbone) {

    // Create a new module
    var EndPage = {};

    // This will fetch the tutorial template and render it.
    EndPage.View = Backbone.View.extend({
        
        viewed: false,
        visible: false,
        hover: false,
        sticky: false,

        template: "app/templates/remix-endpage",

        className: "ZEEGA-remix-endpage",

        initialize: function() {
            this.model.on("endpage_enter", this.endPageEnter, this );
            this.model.on("endpage_exit", this.endPageExit, this );
            this.relatedProjects = $.parseJSON( window.relatedProjectsJSON ).projects;
        },

        serialize: function() {
            if ( this.model.zeega.getCurrentProject() ) {
                return _.extend({
                        path: "http:" + app.metadata.hostname + app.metadata.directory,
                        projects: this.relatedProjects
                    },
                    this.model.zeega.getCurrentProject().toJSON()
                );
            }
        },

        endPageEnter: function() {
            if ( this.model.zeega.getNextPage() ) this.show();
        },

        endPageExit: function() {
            this.hide();
        },

        show: function(){
            this.$el.fadeIn("fast");
        },

        hide: function(){
            this.$el.fadeOut("fast");
        }

    });

    return EndPage;
});


