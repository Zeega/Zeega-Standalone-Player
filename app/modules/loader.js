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

    DELAY: 0,
    /* variables keeping track of generic layer states */
    layerCount : 0,
    layersReady : 0,

    className: 'ZEEGA-loader-overlay',
    template: 'loader',

    initialize: function() {
      this.model.on('layer_loading', this.onLayerLoading, this );
      this.model.on('layer_ready', this.onLayerReady, this );
      this.model.on('data_loaded', this.onDataLoaded, this);
      //this.model.on('can_play', this.onCanPlay, this );
    },

    serialize: function()
    {
      return this.model.toJSON();
    },

    onDataLoaded: function() {

      this.render();

      var coverImage = this.model.get('cover_image');
      if( !_.isNull( coverImage ) && coverImage != "../../../images/default_cover.png" ) {
        this.$('.ZEEGA-loader-bg').css({
          'background': 'url("'+ coverImage +'")',
          'background-position': '50% 50%',
          'background-repeat': 'no-repeat no-repeat',
          'background-attachment': 'fixed',
          '-webkit-background-size': 'cover',
          '-moz-background-size': 'cover',
          '-o-background-size': 'cover',
          'background-size': 'cover'
        });
      }
    },

    onLayerLoading: function(layer) {
      this.layerCount++;

      var item = '<li><i class="zitem-'+ layer.type.toLowerCase() +' zitem-30" data-id="'+ layer.id +'"></i></li>';
      this.$('.ZEEGA-loading-layers').append(item);
    },

    onLayerReady: function(layer) {
      this.layersReady++;

      this.$("[data-id='" + layer.id + "']").addClass('loaded');

      this.$('.ZEEGA-loading-bar').stop().animate({
        'width': (this.layersReady/this.layerCount*100) +'%'
      });
      if(this.layersReady == this.layerCount) this.onCanPlay();
    },

    onCanPlay: function() {
      var _this = this;
      _.delay(function(){
        _this.$el.fadeOut(function(){
          _this.remove();
        });
        _this.model.play();
      },this.DELAY);
    }

  });

  // Required, return the module for AMD compliance
  return Loader;

});
