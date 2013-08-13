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

        template: "app/templates/endpage",

        className: "ZEEGA-end-page",

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

        afterRender: function(){
            if( app.metadata.loggedIn ){
                this.$(".btnz-join").hide();
            }
        },
        endPageEnter: function() {
            if ( !this.model.zeega.getNextPage() ) {
                this.show();
                $(".btn-remix").addClass("remix-endpage");
                $(".btn-remix i").addClass("icon-white");
                $(".btn-remix .content").text("remix this Zeega");
            }
        },

        endPageExit: function() {
            this.hide();
            $(".btn-remix").removeClass("remix-endpage");
            $(".btn-remix i").removeClass("icon-white");
            $(".btn-remix .content").text("remix");
        },

        show: function(){
            this.$el.fadeIn("fast");
            if( !this.viewed ){
                this.viewed = true;
                app.emit("viewed_to_end");
            }
        },
        hide: function(){
            this.$el.fadeOut("fast");
        }

    });

    return EndPage;
});


