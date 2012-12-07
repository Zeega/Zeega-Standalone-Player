define([
  "app",
  // Libs
  "backbone"
],

function(app, Backbone) {

  // Create a new module
  var State = {};

  // This will fetch the tutorial template and render it.
  State = Backbone.Model.extend({
    defaults: {
      'base_rendered': false,
      'first_visit': true,
      'fullscreen': false
    }
  });

  // Required, return the module for AMD compliance
  return State;

});
