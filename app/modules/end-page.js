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
        
        visible: false,
        hover: false,
        sticky: false,

        template: "end-page",

        className: "ZEEGA-end-page",

        initialize: function() {
            this.model.on("endpage_enter", this.endPageEnter, this );
            this.model.on("endpage_exit", this.endPageExit, this );
            this.relatedProjects = $.parseJSON( window.relatedProjectsJSON ).projects;
            

        },

        serialize: function() {
            if ( this.model.project ) {
                return _.extend({
                        path: "http:" + app.metadata.hostname + app.metadata.directory,
                        projects: this.relatedProjects
                    },
                    this.model.project.toJSON()
                );
            }
        },

        afterRender: function(){
            if( app.metadata.loggedIn ){
                this.$(".btnz-join").hide();
            }
        },
        endPageEnter: function() {
            this.show();
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