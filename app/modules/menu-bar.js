define([
  "app",
  // Libs
  "backbone"
],

function(app, Backbone) {

  // Create a new module
  var MenuBar = {};

  // This will fetch the tutorial template and render it.
  MenuBar.View = Backbone.View.extend({
    
    template: 'menu-bar',

    className: 'ZEEGA-player-menu-bar',

    serialize: function() {
        return this.model.toJSON();
    },

    initialize: function() {
      this.model.on('data_loaded', this.render, this);

      this.model.on('play', this.onPlay, this );
      this.model.on('pause', this.onPause, this );
    },

    onPlay: function() {
      this.$('#project-play-pause i').addClass('icon-pause').removeClass('icon-play');
    },

    onPause: function() {
      this.$('#project-play-pause i').addClass('icon-play').removeClass('icon-pause');
    },

    events: {
      'click #project-play-pause': 'playpause',
      'click #project-share': 'share',
      'click #project-credits': 'credits',
      'click #project-fullscreen-toggle': 'fullscreen'
    },

    playpause: function() {
      if(this.model.status == 'paused') this.model.play();
      else this.model.pause();
      return false;
    },

    share: function() {
      console.log('share');
      return false;
    },

    credits: function() {
      console.log('credits');
      return false;
    },

    fullscreen: function() {
      console.log('fullscreen');
      return false;
    },

    fadeOut: function() {
      if(this.visible) {
          this.visible = false;
          this.$el.fadeOut();
      }
    },
 
    fadeIn: function() {
      if(!this.visible) {
          this.visible = true;
          this.$el.fadeIn();
      }
    }

  });

  return MenuBar;

});
