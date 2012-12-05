define([
  "app",

  // Libs
  "backbone",

  // Modules

  // Plugins
  'zeegaplayer'
],

function(app, Backbone, zeega) {

  // Create a new module
  var UI = {};

  // This will fetch the tutorial template and render it.
  UI.Layout = Backbone.Layout.extend({
    el: '#main',

    initialize: function() {
      /* ensure that Zeega is loaded. <paranoia> */
      if(!_.isUndefined(Zeega)) this.initPlayer();
      else
      {
        $(window).bind('zeega_ready', function(){
          this.initPlayer();
        });
      }

      this.insertView( new BGBloader() );
      this.render();
    },

    afterRender: function() {
      app.state.set('base_rendered', true);
    },

    initPlayer: function() {
      /*
        create a zeega player and attach it to app
        don't load it right away so we can attach a listener to it
      */
      app.player = new Zeega.player({'window_fit':true});
      app.player.on('all', function(e, obj){ if(e!='media_timeupdate') console.log('player: e:',e,obj);});
      app.player.load({
        autoplay : false,
        url: 'http://staging.zeega.org/api/projects/3626'
      });

      //_.delay(function(){ app.player.play(); },3000);
    }

  });

  var BGBloader = Backbone.View.extend({
    template: "bgbloader"
  });

  // Required, return the module for AMD compliance
  return UI;

});
