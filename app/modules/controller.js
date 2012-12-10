/*

the controller model should remove any non-route code from router.js
*/

define([
  "app",
  // Libs
  "backbone",

  "modules/ui",

   // Plugins
  'zeegaplayer'

],

function(app, Backbone, UI) {

  // Create a new module
  var Controller = {};

  // Does this need to be a model?? why not right?
  Controller.Model = Backbone.Model.extend({
    
    initialize: function() {
  
      this.initPlayer();

      /*
        render base layout
        the base layout contains the logic for the player skin (citations, ui, etc)
      */
      app.layout = new UI.Layout();
    },

    initPlayer: function()
    {
      var player = new Zeega.player({
        'window_fit': true,
        'autoplay': false,
        'div_id' : 'player'
      });

      // outputs player events to the console
      player.on('all', function(e, obj){ if(e!='media_timeupdate') console.log('    player event:',e,obj);});
      // listen for frame events to update the router
      player.on('frame_rendered', this.onFrameRender, this);
      player.on('sequence_enter', this.updateWindowTitle, this);

      player.load({
        url: app.api + app.state.get('project_id'),
        start_frame: app.state.get('frame_id')
      });

      app.player = player;
    },

    onFrameRender: function(info) {
      app.router.navigate( app.state.get('project_id') +'/f/'+ info.id );
    },

    updateWindowTitle: function(info) {
      var def = /Sequence ([0-9]*)/g.test(info.title);
      var seqTitle = def ? '' : ' - '+ info.title;
      $('title').text( app.player.get('title')+ seqTitle );
    }

  });


  // Required, return the module for AMD compliance
  return Controller;

});
