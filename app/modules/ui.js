define([
  "app",

  // Libs
  "backbone",

  // Modules,
  'modules/loader',
  'modules/controls'

],

function(app, Backbone, Loader, Controls) {

  // Create a new module
  var UI = {};

  // This will fetch the tutorial template and render it.
  UI.Layout = Backbone.Layout.extend({
    
    el: '#main',

    initialize: function() {
      this.insertView( new Loader.View({model: app.player}) );
      this.insertView( new Controls.View({model: app.player}) );
      this.render();
    },

    afterRender: function() {
      app.state.set('base_rendered', true);
    }

  });

  // Required, return the module for AMD compliance
  return UI;

});
