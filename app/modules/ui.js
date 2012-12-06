/*

  ui.js

  the ui layer or skin that sits over player and controls/reacts to it
*/

define([
  "app",

  // Libs
  "backbone",

  // Modules,
  'modules/loader',
  'modules/controls',
  'modules/citations'

],

function(app, Backbone, Loader, Controls, Citations) {

  // Create a new module
  var UI = {};

  // This will fetch the tutorial template and render it.
  UI.Layout = Backbone.Layout.extend({
    
    el: '#main',

    initialize: function() {
      this.insertView( new Loader.View({model: app.player}) );
      this.insertView( new Controls.View({model: app.player}) );
      this.insertView( new Citations.View({model: app.player}) );
      this.render();
    },

    afterRender: function() {
      app.state.set('base_rendered', true);
    }

  });

  // Required, return the module for AMD compliance
  return UI;

});
