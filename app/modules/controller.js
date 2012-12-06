/*

the controller model should remove any non-route code from router.js
*/

define([
  "app",
  // Libs
  "backbone",

  "modules/state",
  "modules/ui",

   // Plugins
  'zeegaplayer'

],

function(app, Backbone, State, UI) {

  // Create a new module
  var Controller = {};

  // Does this need to be a model?? why not right?
  Controller.Model = Backbone.Model.extend({
    
    initialize: function() {
  
      this.initPlayer();

      /*
        app.state stores information on the current state of the application
      */
      app.state = new State();
      /*
        render base layout
        the base layout contains the logic for the player skin (citations, ui, etc)
      */
      app.layout = new UI.Layout();
    },

    initPlayer: function() {
      var player = new Zeega.player({
        'window_fit': true,
        'autoplay': false
      });
      player.on('all', function(e, obj){ if(e!='media_timeupdate') console.log('player: e:',e,obj);});
      player.load({
        url: 'http://staging.zeega.org/api/projects/3662'
      });
      app.player = player;
    }

  });


  // Required, return the module for AMD compliance
  return Controller;

});
