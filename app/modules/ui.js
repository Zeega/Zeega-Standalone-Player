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
  'modules/citations',
  'modules/menu-bar'

],

function(app, Backbone, Loader, Controls, Citations, MenuBar) {

  // Create a new module
  var UI = {};

  var FADE_OUT_DELAY = 3000;

  // This will fetch the tutorial template and render it.
  UI.Layout = Backbone.Layout.extend({
    
    el: '#main',

    initialize: function() {

      this.loader = new Loader.View({model: app.player});
      this.controls = new Controls.View({model: app.player});
      this.citations = new Citations.View({model: app.player});
      this.menuBar = new MenuBar.View({model: app.player});

      this.insertView( this.loader );
      this.insertView( this.controls );
      this.insertView( this.citations );
      this.insertView( this.menuBar );
      this.render();
    },

    afterRender: function() {
      app.state.set('base_rendered', true);
      this.resetFadeOutTimer();
    },

    events : {
      'mousemove': 'resetFadeOutTimer'
    },

    resetFadeOutTimer: function() {
      var _this =  this;
      this.citations.fadeIn();
      this.menuBar.fadeIn();
      if(this.timer) clearTimeout( this.timer );
      this.timer = setTimeout(function(){
        _this.citations.fadeOut();
        _this.menuBar.fadeOut();
      }, FADE_OUT_DELAY);
    }

  });

  // Required, return the module for AMD compliance
  return UI;

});
