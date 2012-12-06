define([
  "app",
  // Libs
  "backbone"
],

function(app, Backbone) {

  // Create a new module
  var Loader = {};

  // This will fetch the tutorial template and render it.
  Loader.View = Backbone.View.extend({
    
    template: 'loader'

  });

  // Required, return the module for AMD compliance
  return Loader;

});
