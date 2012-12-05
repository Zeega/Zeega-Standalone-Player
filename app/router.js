define([
	// Application.
	"app",

	//"app",

	// Modules.
	"modules/state",
	"modules/ui"

],

function(app, State, UI) {
	// Defining the application router, you can attach sub routers here.
	var Router = Backbone.Router.extend({
		routes: {
			"": "base",

			"project/:project_id" : 'goToProject',
			"p/:project_id" : 'goToProject',

			"project/:project_id/frame/:frame_id": 'goToProjectFrame',
			"p/:project_id/f/:frame_id": 'goToProjectFrame'
		},

		/*
		when no route is present.

		player could wait for user input or rely on bootstrapped data
		*/
		base: function() {
			initialize();
		},

		goToProject: function(project_id) {
			initialize();
			app.state.set('project_id',project_id);
		},

		goToProjectFrame: function(project_id,frame_id) {
			initialize();
			app.state.set({
				'project_id': project_id,
				'frame_id': frame_id
			});
		}

	});

	/* create init fxn that can only run once per load */
	var init = function() {
		/*
			app.state stores information on the current state of the application
		*/
		app.state = new State();
		/*
			render base layout
			the base layout contains the logic for the player skin (citations, ui, etc)
		*/
		app.layout = new UI.Layout();
	};
	var initialize = _.once(init);
	
	return Router;

});
