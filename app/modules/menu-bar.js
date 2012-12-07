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
      'click #project-fullscreen-toggle': 'toggleFullscreen'
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

    toggleFullscreen : function()
    {
      if(app.state.get('fullscreen')) this.leaveFullscreen();
      else this.goFullscreen();
      return false;
    },

    goFullscreen : function() {
      app.state.set('fullscreen', true);
      docElm = document.getElementById('main');
          
      if (docElm.requestFullscreen) docElm.requestFullscreen();
      else if (docElm.mozRequestFullScreen) docElm.mozRequestFullScreen();
      else if (docElm.webkitRequestFullScreen) docElm.webkitRequestFullScreen();

      this.$('#project-fullscreen-toggle i').removeClass('icon-resize-full').addClass('icon-resize-small');
    },

    leaveFullscreen : function() {
      app.state.set('fullscreen', false);
      if (document.exitFullscreen)        document.exitFullscreen();
      else if (document.mozCancelFullScreen)    document.mozCancelFullScreen();
      else if (document.webkitCancelFullScreen)   document.webkitCancelFullScreen();

      this.$('#project-fullscreen-toggle i').addClass('icon-resize-full').removeClass('icon-resize-small');
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
