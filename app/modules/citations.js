define([
  "app",
  // Libs
  "backbone"
],

function(app, Backbone) {

  // Create a new module
  var Citations = {};

  // This will fetch the tutorial template and render it.
  Citations.View = Backbone.View.extend({
    
    visible : true,

    template: 'citations',

    className: 'ZEEGA-player-citations',

    serialize: function() {
        return this.model.toJSON();
    },

    initialize: function() {
      /* update the arrow state whenever a frame is rendered */
      this.model.on('frame_rendered', this.updateCitations, this);
      this.model.on('can_play', this.render, this);
    },

    updateCitations: function(info) {
        var _this = this;
        this.$('.ZEEGA-citations-primary').empty();
        var layersToCite = _.map(info.layers,function(layer){
            if(layer.showCitation) return layer;
            return false;
        });
        _.each( _.compact(layersToCite), function(layer){
            var citation = new CitationView({ model: new Backbone.Model(layer) });
            _this.$('.ZEEGA-citations-primary').append(citation.el);
            citation.render();
        });
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

  var CitationView = Backbone.View.extend({
    tagName: 'li',
    template: 'citation',
    serialize: function() {
        return this.model.toJSON();
    },

    events: {
        'hover': 'onHover'
    },

    onHover: function()
    {
        this.$('i').toggleClass('loaded');
    }
  
  });

  return Citations;

});
