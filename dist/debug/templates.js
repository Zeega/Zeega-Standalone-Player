this["JST"] = this["JST"] || {};

this["JST"]["app/templates/citation.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="'+
( attr.attribution_uri )+
'" target="blank">\n    <i class="icon-'+
( iconType )+
' icon-white"></i>\n</a>';
}
return __p;
};

this["JST"]["app/templates/controls.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="arrow arrow-left prev disabled"></a>\n<a href="#" class="arrow arrow-right next disabled"></a>';
}
return __p;
};

this["JST"]["app/templates/endpage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="end-page-wrapper" >\n    <h2>Explore More Zeegas</h2>\n';
 _.each(projects, function( project ) { 
;__p+='\n    <article style="background-image: url('+
(project.cover_image )+
');" >\n            <div class="info-overlay">\n                <div class="left-column">\n                  <a data-bypass="true" href="'+
(path )+
'profile/'+
(project.user.id )+
'" >\n                    <div class="profile-token" style="background-image: url('+
( project.user.thumbnail_url )+
');"></div>\n                   </a>\n                </div>\n                <div class="right-column">\n                  <h1 class = "caption">'+
( project.title )+
'</h1>\n                  \n                  <div class="profile-name">\n                    <a data-bypass="true" href="'+
(path )+
'profile/'+
(project.user.id)+
'" >\n                      '+
(project.user.display_name)+
'\n                    </a>\n                   \n                  </div>\n                 \n                </div>\n                  \n            \n            </div>\n            <a href="'+
(path )+
''+
(project.id )+
'" class="mobile-play" data-bypass="true"></a>\n    </article>\n';
 }); 
;__p+='\n\n</div>';
}
return __p;
};

this["JST"]["app/templates/loader.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-notices">\n    <ul class="sticky">\n        <li><i class="icon-headphones icon-white"></i> turn up volume</li>\n        <li>click arrows and hotspots to explore</li>\n    </ul>\n    <ul class="rotating">\n    </ul>\n</div>\n\n<div class="ZEEGA-loader-bg-overlay"></div>\n<div class="ZEEGA-loader-bg"\n    style="\n        background: url('+
( cover_image )+
');\n        background-position: 50% 50%;\n        background-repeat: no-repeat no-repeat;\n        background-attachment: fixed;\n        -webkit-background-size: cover;\n        -moz-background-size: cover;\n        -o-background-size: cover;\n        background-size: cover;\n    "\n></div>\n';
}
return __p;
};

this["JST"]["app/templates/menu-bar-bottom.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-chrome-metablock">\n    <div class="meta-inner">\n        <div class="left-col">\n            <a href="';
 path 
;__p+='profile/'+
( userId )+
'" ';
 if (window!=window.top) { 
;__p+=' target="blank" ';
 } 
;__p+=' data-bypass="true">\n                <div class="profile-token"\n                    style="\n                        background-image: url('+
( userThumbnail )+
');\n                        background-size: cover;\n                    "\n                ></div>\n            </a>\n        </div>\n        <div class="right-col">\n            <div class="caption">'+
( title )+
'</div>\n            <div class="username">\n                <a class="profile-name" href="';
 path 
;__p+='profile/'+
( userId )+
'" data-bypass="true" ';
 if (window!=window.top) { 
;__p+=' target="blank" ';
 } 
;__p+=' >\n                    '+
( authors )+
'\n                </a>\n                ';
 if ( favorite_count > 0 ) {  
;__p+=' \n                <span class="zeega-favorite_count"> ♥ '+
( favorite_count )+
' ';
 if ( favorite_count == 1) {  
;__p+=' favorite ';
 } else {
;__p+=' favorites ';
 } 
;__p+='</span>\n                ';
 } 
;__p+='\n                <span class="zeega-views"> <i class="icon-play icon-white"></i> ';
 if ( !_.isNumber( views ) ) { views = 0 ;} 
;__p+=''+
( views )+
' ';
 if ( views != 1 ) { 
;__p+='views';
 } else { 
;__p+='view';
 } 
;__p+='</span>\n            </div>\n        </div>\n\n        <div class="favorite">\n\n            ';
 if ( favorite === true ) {  
;__p+=' \n                <a href="#" class="btnz favorite-btnz favorited">♥ favorite</a>\n            ';
 } else {
;__p+='\n                <a href="#" class="btnz favorite-btnz">♥ favorite</a>\n            ';
 } 
;__p+='\n        </div>\n\n        <div class="citations">\n            <ul></ul>\n            <div class="citation-meta">\n                <div class="citation-title"></div>\n            </div>\n        </div>\n        <a href="#" class="ZEEGA-home"></a>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/menu-bar-top.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n';
 if ( !window.frameElement || !window.frameElement.getAttribute("hidechrome") ) { 
;__p+='\n\n<a href="'+
( path )+
'" ';
 if (window!=window.top ) { 
;__p+=' target="blank" ';
 } 
;__p+=' data-bypass="true" >\n    <div class="ZEEGA-tab">\n        <div class="ZTab-logo"></div>\n    </div>\n</a>\n\n\n\n<a href="'+
( path )+
'register/" ';
 if (window!=window.top) { 
;__p+=' target="blank" ';
 } 
;__p+=' data-bypass="true" class="btnz btnz-join">Join Zeega</a>\n\n';
 } 
;__p+='\n\n<div class="menu-right">\n    <a class="social-share-icon" href="https://twitter.com/intent/tweet?original_referer='+
( path )+
''+
( id )+
'&text='+
( title )+
' '+
( path )+
''+
( id )+
' made w/ @zeega" target="blank"><i class="zsocial-twitter"></i></a>\n    <a class="social-share-icon" href="http://www.facebook.com/sharer.php?u='+
( path )+
''+
( id )+
'" target="blank"><i class="zsocial-facebook"></i></a>\n    <a class="social-share-icon" href="http://www.tumblr.com/share/photo?'+
( tumblr_share )+
'" target="blank"><i class="zsocial-tumblr"></i></a>\n\n    <a href="#" id="project-fullscreen-toggle" class="btnz">fullscreen</a>\n    <a class="ZEEGA-sound-state" style="display:none;"></a>\n</div>';
}
return __p;
};

this["JST"]["app/templates/pause.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/av/av.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">media controls</div>\n<a href="#" class="playpause"><i class="icon-play icon-white"></i></a>\n<div class="av-slider"></div>\n';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/checkbox/checkbox.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">'+
( title )+
'</div>\n<div class="roundedOne">\n    <input type="checkbox" value="None" id="roundedOne" name="check" />\n    <label for="roundedOne"></label>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/color/color.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">'+
( _title )+
'</div>\n<div class="color-selector">\n    <input class="simple_color" value="'+
( attr[ _propertyName ] )+
'"/>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/dropdown/dropdown.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">'+
( title )+
'</div>\n<div class="dropdown-wrapper">\n    <select class="'+
( propertyName )+
'-dropdown">\n        ';
 _.each( optionList, function( option ) { 
;__p+='\n            <option value="'+
( option.value )+
'">'+
( option.title )+
'</option>\n        ';
 }); 
;__p+='\n    </select>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/linkimage/linkimage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">type</div>\n<select class="link-image-select">\n    <option value="arrow_up">Up Arrow</option>\n    <option value="arrow_down">Down Arrow</option>\n    <option value="arrow_left">Left Arrow</option>\n    <option value="arrow_right">Right Arrow</option>\n    <option value="default">Glowing Rectangle</option>\n</select>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/linkto/linkto.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">link to</div>\n<div class="control-frame-thumb" style="\n    background: url('+
( thumbnail_url )+
') no-repeat center center; \n    -webkit-background-size: cover;\n    background-size: cover;\n">\n    <a href="#"></a>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/opacity/opacity.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="hover-icon">\n    <i class="icon-eye-open id-icon icon-white"></i>\n    <input type="text" class="text-input" value="'+
( Math.floor( attr.opacity * 100 ) )+
'">\n    <div class="hidden-controls">\n        <div class="opacity-slider"></div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/slider/slider.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="hover-icon">\n    <div class="control-name">'+
( title )+
'</div>\n    <input type="text" class="text-input" value="'+
( Math.floor( attr[ _propertyName ] * 100 ) )+
'">\n    <div class="hidden-controls">\n        <div class="control-slider"></div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/audio/audio-flash.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="audio-flash-'+
( id )+
'" data-src="'+
( attr.uri )+
'"  data-cue="'+
( attr.cue_in )+
'"  >\n    <div id="flash-'+
( id )+
'" %>" > \n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/audio/audio.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<audio id="audio-el-'+
( id )+
'" src="'+
( attr.uri )+
'"\n    ';
 if ( attr.loop ) { 
;__p+='\n        loop\n    ';
 } 
;__p+='\n    preload\n></audio>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/end_page/endpage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/image/image.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target" style="\n    background: url('+
( attr.uri )+
');\n    background-size: cover;\n    background-position: center;\n"></div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/link/frame-chooser.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="modal-close">&times;</a>\n<div class="modal-content">\n    <div class="modal-title">Where do you want your link to go?</div>\n    <div class="modal-body">\n        <a href="#" class="link-new-page"><i class="icon-plus icon-white"></i></br>New Page</a>\n        <div class="divider">or</div>\n        <ul class="page-chooser-list clearfix"></ul>\n        <div class="bottom-chooser">\n            <a href="#" class="submit btnz btnz-submit btnz-inactive">OK</a>\n        </div>\n    </div>\n</div>\n';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/link/link.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div href=\'#\' class=\'ZEEGA-link-inner\'></div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/rectangle/rectangle.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target"></div>\n<div class="controls-inline"></div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/text/text.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target">'+
( attr.content )+
'</div>\n<div class="controls-inline"></div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/text_v2/text-v2.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target">'+
( attr.content )+
'</div>\n<div class="controls-inline"></div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/text_v2/textmodal.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="modal-content">\n    <div class="modal-title">Edit your text</div>\n    <div class="modal-body">\n\n        <div class="top-box clearfix">\n            <textarea rows="4" cols="59" maxlength="140">'+
( attr.content )+
'</textarea>\n            <select class="font-list" id="font-list-'+
( id )+
'"></select>\n            <div class="textarea-info">max 140 characters</div>\n        </div>\n\n        <div class="bottom-box clearfix">\n            <a href="#" class="link-page-open action ';
 if ( attr.to_frame ) { 
;__p+='hide';
 } 
;__p+='"><i class="icon-plus-sign"></i> link to page</a>\n\n            <div class="page-chooser-wrapper ';
 if ( !attr.to_frame ) { 
;__p+='hide';
 } 
;__p+='">\n                <a href="#" class="link-new-page"><i class="icon-plus icon-white"></i></br>New Page</a>\n                <div class="divider">or</div>\n                <ul class="page-chooser-list clearfix"></ul>\n                <a href="#" class="unlink-text action"><i class="icon-minus-sign"></i> remove link</a>\n            </div>\n        </div>\n\n        <div class="bottom-chooser clearfix">\n            <a href="#" class="text-modal-save btnz btnz-submit">OK</a>\n        </div>\n    </div>\n</div>\n';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/youtube/youtube.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div   class="youtube-player"  class="visual-target">\n    \n\n    <iframe id="yt-player-'+
( id )+
'" type="text/html" width="100%" height="100%"\n        src="http://www.youtube.com/embed/'+
( attr.uri )+
'?enablejsapi=1&iv_load_policy=3&showinfo=0';
 if ( !/iPad/i.test(navigator.userAgent) ) { 
;__p+='&controls=0';
 } 
;__p+='&modestbranding=1&disablekb=1&rel=0&wmode=opaque"\n        frameborder="0">\n    </iframe>\n</div>\n<div class="play-button"></div>\n<div class="ipad-cover"> pause video to return to Zeega </div>\n<div class="controls-inline"></div>\n\n';
}
return __p;
};

this["JST"]["app/player/templates/controls/arrows.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="ZEEGA-prev controls-arrow arrow-left disabled"></a>\n<a href="#" class="ZEEGA-next controls-arrow arrow-right disabled"></a>';
}
return __p;
};

this["JST"]["app/player/templates/controls/close.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="ZEEGA-close">&times;</a>';
}
return __p;
};

this["JST"]["app/player/templates/controls/playpause.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="ZEEGA-playpause pause-zcon"></a>';
}
return __p;
};

this["JST"]["app/player/templates/controls/size-toggle.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="size-toggle">\n    ';
 if ( previewMode == "mobile" ) { 
;__p+='\n        <i class="size-toggle-mobile"\n            title="Switch to laptop view"\n            data-gravity="w"\n        ></i>\n    ';
 } else { 
;__p+='\n        <i class="size-toggle-laptop"\n            title="Switch to mobile view"\n            data-gravity="w"\n        ></i>\n    ';
 } 
;__p+='\n</a>';
}
return __p;
};

this["JST"]["app/player/templates/layouts/player-layout.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-player-wrapper">\n    <div class="ZEEGA-player-window"></div>\n</div>';
}
return __p;
};